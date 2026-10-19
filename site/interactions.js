'use strict';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

// A slight shift and tilt, without changing the stacking order of the cards.
for (const card of document.querySelectorAll('.screen-tile')) {
  const reset = () => { card.style.removeProperty('--hover-x'); card.style.removeProperty('--hover-y'); card.style.removeProperty('--hover-rotate'); };
  card.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !finePointer.matches) return;
    const rect = card.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    card.style.setProperty('--hover-x', `${x * 4}px`);
    card.style.setProperty('--hover-y', `${y * 4 - 2}px`);
    card.style.setProperty('--hover-rotate', `${x * 1.2}deg`);
  });
  card.addEventListener('pointerleave', reset);
  card.addEventListener('blur', reset);
  reducedMotion.addEventListener('change', reset);
}

function syncLanguageLinks() {
  for (const link of document.querySelectorAll('[data-language]')) link.hash = location.hash;
}
syncLanguageLinks();
addEventListener('hashchange', syncLanguageLinks);

// The original image remains the fallback. Only green foliage and grass move.
async function initializeWind() {
  const art = document.querySelector('.hero-art');
  if (!art) return;
  const image = art.querySelector('img');
  const canvas = art.querySelector('canvas');
  const toggle = document.querySelector('.wind-toggle');
  const pauseIcon = toggle.innerHTML;
  const playIcon = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  try { await image.decode(); } catch { return; }
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
  if (!gl) return;
  const vertexSource = `attribute vec2 a_position; varying vec2 v_uv;
    void main(){v_uv=vec2((a_position.x+1.0)*0.5,(1.0-a_position.y)*0.5);gl_Position=vec4(a_position,0.0,1.0);}`;
  const fragmentSource = `precision mediump float;
    uniform sampler2D u_image;uniform vec2 u_scale;uniform vec2 u_offset;uniform float u_time;varying vec2 v_uv;
    void main(){
      vec2 uv=v_uv*u_scale+u_offset;
      vec3 base=texture2D(u_image,uv).rgb;
      float green=smoothstep(0.015,0.105,min(base.g-base.r*0.89,base.g-base.b*0.98));
      float crown=smoothstep(0.29,0.47,uv.x)*(1.0-smoothstep(0.49,0.68,uv.y));
      float grass=smoothstep(0.74,0.90,uv.y);
      float mask=green*max(crown,grass);
      float wave=sin(uv.y*32.0+u_time*0.9)+0.38*sin(uv.x*46.0-u_time*0.67);
      vec2 drift=vec2(wave*0.00135,cos(uv.x*38.0+u_time*0.7)*0.00042)*mask;
      gl_FragColor=texture2D(u_image,clamp(uv+drift,vec2(0.001),vec2(0.999)));
    }`;
  const compile = (type, source) => {
    const shader = gl.createShader(type);gl.shaderSource(shader, source);gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {gl.deleteShader(shader);throw new Error('Wind shader unavailable');}
    return shader;
  };
  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const buffer = gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    const texture = gl.createTexture();gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
    gl.uniform1i(gl.getUniformLocation(program,'u_image'),0);
  } catch { return; }
  const scale = gl.getUniformLocation(program,'u_scale');
  const offset = gl.getUniformLocation(program,'u_offset');
  const time = gl.getUniformLocation(program,'u_time');
  let frame = 0, lastFrame = 0, visible = true, paused = false, lost = false;
  const resize = () => {
    const w=art.clientWidth,h=art.clientHeight;
    if (!w||!h) return;
    const dpr=Math.min(devicePixelRatio||1,1.25,1800/w);
    canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);gl.viewport(0,0,canvas.width,canvas.height);
    const cover=Math.max(w/image.naturalWidth,h/image.naturalHeight),iw=image.naturalWidth*cover,ih=image.naturalHeight*cover;
    const pos=getComputedStyle(image).objectPosition.split(' ');
    const fraction=(value, fallback)=>value?.endsWith('%')?parseFloat(value)/100:value==='top'||value==='left'?0:value==='bottom'||value==='right'?1:fallback;
    gl.uniform2f(scale,w/iw,h/ih);gl.uniform2f(offset,(iw-w)/iw*fraction(pos[0],.5),(ih-h)/ih*fraction(pos[1],.5));
  };
  const render = stamp => {
    if (!frame) return;
    if (stamp-lastFrame>=1000/30) {lastFrame=stamp;gl.uniform1f(time,stamp/1000);gl.drawArrays(gl.TRIANGLES,0,6);}
    frame=requestAnimationFrame(render);
  };
  const update = () => {
    if (frame) cancelAnimationFrame(frame);frame=0;
    const active=!reducedMotion.matches&&!paused&&!lost;
    canvas.hidden=!active;art.classList.toggle('wind-ready',active);art.dataset.wind=active?'active':'paused';
    toggle.hidden=reducedMotion.matches||lost;
    toggle.setAttribute('aria-label',paused?toggle.dataset.playLabel:toggle.dataset.pauseLabel);
    toggle.setAttribute('aria-pressed',String(paused));
    toggle.innerHTML=paused?playIcon:pauseIcon;
    if (active) {resize();gl.uniform1f(time,performance.now()/1000);gl.drawArrays(gl.TRIANGLES,0,6);if(visible&&!document.hidden) frame=requestAnimationFrame(render);}
  };
  toggle.addEventListener('click',()=>{paused=!paused;update();});
  reducedMotion.addEventListener('change',update);document.addEventListener('visibilitychange',update);
  new ResizeObserver(()=>{if(!lost){resize();if(!frame&&!canvas.hidden)gl.drawArrays(gl.TRIANGLES,0,6);}}).observe(art);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();},{threshold:.01}).observe(art);
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;update();});
  update();
}
initializeWind().catch(()=>{});
