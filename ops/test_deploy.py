import io
import json
import tarfile
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from deploy import REQUIRED_FILES, deploy, unpack


def archive_with(extra_name: str | None = None, link: bool = False) -> io.BytesIO:
    output = io.BytesIO()

    with tarfile.open(fileobj=output, mode="w:gz") as archive:
        for name in REQUIRED_FILES:
            info = tarfile.TarInfo(name)
            info.size = 4
            archive.addfile(info, io.BytesIO(b"test"))

        if extra_name:
            info = tarfile.TarInfo(extra_name)

            if link:
                info.type = tarfile.SYMTYPE
                info.linkname = "/etc/passwd"

            archive.addfile(info)

    output.seek(0)

    return output


class ReleaseTests(unittest.TestCase):
    def test_complete_static_archive(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            unpack(archive_with(), Path(temporary))
            self.assertEqual((Path(temporary) / "index.html").read_text(), "test")

    def test_rejects_unsafe_paths(self) -> None:
        for name in ("../escape", "/escape", ".env", "assets/../../escape", "C:\\escape"):
            with self.subTest(name=name), tempfile.TemporaryDirectory() as temporary:
                with self.assertRaises(ValueError):
                    unpack(archive_with(name), Path(temporary))

    def test_rejects_symlinks(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            with self.assertRaises(ValueError):
                unpack(archive_with("assets/linked", link=True), Path(temporary))

    def test_rejects_duplicate_files(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            with self.assertRaises(FileExistsError):
                unpack(archive_with("index.html"), Path(temporary))

    def test_rejects_oversize_release(self) -> None:
        with tempfile.TemporaryDirectory() as temporary, patch("deploy.MAX_BYTES", 1):
            with self.assertRaises(ValueError):
                unpack(archive_with(), Path(temporary))

    def test_rejects_missing_pages(self) -> None:
        empty = io.BytesIO()

        with tarfile.open(fileobj=empty, mode="w:gz"):
            pass

        empty.seek(0)

        with tempfile.TemporaryDirectory() as temporary:
            with self.assertRaises(ValueError):
                unpack(empty, Path(temporary))

    def test_rejects_invalid_release_name(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            with self.assertRaises(ValueError):
                deploy(archive_with(), "../../escape", Path(temporary))

    def test_prepares_version_before_activation(self) -> None:
        name = "a" * 40 + "-1-1"

        with tempfile.TemporaryDirectory() as temporary, patch("deploy.switch_link") as activate:
            release = deploy(archive_with(), name, Path(temporary))
            self.assertEqual(json.loads((release / "version.json").read_text())["revision"], "a" * 40)
            activate.assert_called_once_with(Path(temporary).resolve() / "current", release)

            with self.assertRaises(ValueError):
                deploy(archive_with(), name, Path(temporary))

    def test_invalid_archive_does_not_activate(self) -> None:
        with tempfile.TemporaryDirectory() as temporary, patch("deploy.switch_link") as activate:
            with self.assertRaises(ValueError):
                deploy(archive_with("../escape"), "a" * 40 + "-1-1", Path(temporary))

            activate.assert_not_called()
            self.assertEqual(list((Path(temporary) / "releases").iterdir()), [])


if __name__ == "__main__":
    unittest.main()
