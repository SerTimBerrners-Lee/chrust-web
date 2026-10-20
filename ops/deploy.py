#!/usr/bin/python3
"""Receive one static release over a restricted SSH connection."""

import json
import os
import re
import shutil
import sys
import tarfile
from pathlib import Path, PurePosixPath
from tempfile import TemporaryDirectory
from typing import BinaryIO

ROOT = Path("/var/www/chrust.org")
MAX_BYTES = 300 * 1024 * 1024
REQUIRED_FILES = (
    "index.html", "ru/index.html", "en/index.html",
    "download/index.html", "ru/download/index.html", "en/download/index.html",
    "project.css", "interactions.js", "assets/chrust-logo.png",
    "assets/chrust-hero-oak.jpg",
)


def unpack(stream: BinaryIO, destination: Path) -> None:
    total = 0
    count = 0

    with tarfile.open(fileobj=stream, mode="r|gz") as archive:
        for member in archive:
            path = PurePosixPath(member.name)

            if member.name in (".", "./") and member.isdir():
                continue

            if (
                path.is_absolute()
                or not path.parts
                or any(part.startswith(".") for part in path.parts)
                or "\\" in member.name
                or ":" in member.name
                or not (member.isdir() or member.isfile())
            ):
                raise ValueError("Archive contains an unsafe path or file type")

            total += member.size
            count += 1

            if total > MAX_BYTES or count > 10000:
                raise ValueError("Release exceeds the allowed size")

            target = destination.joinpath(*path.parts)

            if member.isdir():
                target.mkdir(mode=0o755, parents=True, exist_ok=True)
                continue

            target.parent.mkdir(mode=0o755, parents=True, exist_ok=True)
            source = archive.extractfile(member)

            if source is None:
                raise ValueError("Archive file is unreadable")

            with source, target.open("xb") as output:
                shutil.copyfileobj(source, output)

            target.chmod(0o644)

    for required in REQUIRED_FILES:
        if not (destination / required).is_file():
            raise ValueError(f"Missing required file: {required}")


def switch_link(link: Path, release: Path) -> None:
    pending = link.with_name(f".{link.name}-{os.getpid()}")
    pending.symlink_to(release, target_is_directory=True)
    os.replace(pending, link)


def deploy(stream: BinaryIO, release_name: str, root: Path = ROOT) -> Path:
    if not re.fullmatch(r"[0-9a-f]{40}-[0-9]+-[0-9]+", release_name):
        raise ValueError("Expected a commit SHA, run ID and attempt number")

    root = root.resolve(strict=True)
    releases = root / "releases"
    releases.mkdir(mode=0o755, exist_ok=True)
    release = releases / release_name

    if release.exists():
        raise ValueError("This immutable release already exists")

    with TemporaryDirectory(prefix=".incoming-", dir=releases) as temporary:
        staging = Path(temporary)
        unpack(stream, staging)
        (staging / "version.json").write_text(
            json.dumps({"revision": release_name[:40], "release": release_name}) + "\n",
            encoding="utf-8",
        )
        staging.chmod(0o755)
        staging.rename(release)

    current = root / "current"

    if current.is_symlink():
        previous = current.resolve(strict=True)

        if previous.parent != releases:
            raise ValueError("The current release is outside this site's release directory")

        switch_link(root / "previous", previous)
    elif current.exists():
        raise ValueError("The current path is not a release symlink")

    switch_link(current, release)

    return release


if __name__ == "__main__":
    try:
        deployed = deploy(sys.stdin.buffer, os.environ.get("SSH_ORIGINAL_COMMAND", ""))
        print(f"Deployed {deployed.name}")
    except (OSError, ValueError, tarfile.TarError) as error:
        print(f"Deployment rejected: {error}", file=sys.stderr)
        sys.exit(1)
