#!/bin/sh
set -eu

test "$(id -u)" = 0
setup_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
site_root=/var/www/chrust.org
deploy_home=/var/lib/chrust-web-deploy
nginx_config=/etc/nginx/sites-available/chrust.org

if ! id chrust-web-deploy >/dev/null 2>&1; then
    useradd --system --home-dir "$deploy_home" --shell /bin/sh chrust-web-deploy
fi

if test -e "$nginx_config" || test -e /etc/nginx/sites-enabled/chrust.org; then
    printf '%s\n' 'A Chrust nginx configuration already exists; review it before setup.' >&2
    exit 1
fi

install -d -m 0755 -o chrust-web-deploy -g chrust-web-deploy "$site_root" "$site_root/releases"
install -d -m 0755 -o root -g root "$site_root/acme" "$deploy_home" "$deploy_home/.ssh" /usr/local/libexec
install -m 0755 -o root -g root "$setup_dir/deploy.py" /usr/local/libexec/chrust-web-deploy

test "$(cut -d ' ' -f 1 "$setup_dir/deploy.pub")" = ssh-ed25519
{
    printf '%s ' 'restrict,command="/usr/local/libexec/chrust-web-deploy"'
    cat "$setup_dir/deploy.pub"
} > "$deploy_home/.ssh/authorized_keys"
chown root:root "$deploy_home/.ssh/authorized_keys"
chmod 0644 "$deploy_home/.ssh/authorized_keys"

install -m 0644 -o root -g root "$setup_dir/chrust.org.nginx.conf" "$nginx_config"
ln -s "$nginx_config" /etc/nginx/sites-enabled/chrust.org

if ! nginx -t; then
    unlink /etc/nginx/sites-enabled/chrust.org
    exit 1
fi

systemctl reload nginx
printf '%s\n' 'Chrust host and restricted deployment account are ready.'
