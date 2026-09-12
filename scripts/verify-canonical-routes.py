#!/usr/bin/env python3
"""Verify title-derived canonical routes and their legacy aliases."""

from pathlib import Path
import re
import sys
import unicodedata


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT / "public"
SECTIONS = {"posts": "writing", "projects": "making", "research": "learning", "skills": "skills"}


def title_slug(title: str) -> str:
    text = unicodedata.normalize("NFKD", title).encode("ascii", "ignore").decode()
    text = re.sub(r"['’]", "", text.lower())
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


def frontmatter(path: Path) -> tuple[str, str, list[str], str]:
    text = path.read_text()
    delimiter = "+++" if text.startswith("+++\n") else "---"
    match = re.match(rf"^{re.escape(delimiter)}\n(.*?)\n{re.escape(delimiter)}", text, re.S)
    if not match:
        raise AssertionError(f"{path.relative_to(ROOT)}: missing front matter")
    block = match.group(1)

    def scalar(name: str, default: str = "") -> str:
        found = re.search(rf'^\s*{name}\s*[:=]\s*["\']?(.*?)["\']?\s*$', block, re.M)
        return found.group(1) if found else default

    aliases = []
    lines = block.splitlines()
    for index, line in enumerate(lines):
        if re.match(r"^aliases\s*:\s*$", line):
            for alias_line in lines[index + 1:]:
                found = re.match(r'^\s+-\s+["\']?([^"\']+?)["\']?\s*$', alias_line)
                if not found:
                    break
                aliases.append(found.group(1))
    inline_aliases = re.search(r"^aliases\s*=\s*\[(.*?)\]\s*$", block, re.M)
    if inline_aliases:
        aliases = re.findall(r'["\']([^"\']+)["\']', inline_aliases.group(1))
    return scalar("title"), scalar("slug"), aliases, scalar("visibility", "public")


def output(route: str) -> Path:
    return PUBLIC / route.strip("/") / "index.html"


errors: list[str] = []
for source_section, public_section in SECTIONS.items():
    for path in sorted((ROOT / "content" / source_section).rglob("*.md")):
        if path.name == "_index.md":
            continue
        title, slug, aliases, visibility = frontmatter(path)
        expected = title_slug(title)
        if slug and slug != expected:
            errors.append(f"{path.relative_to(ROOT)}: slug {slug!r}, expected {expected!r}")

        source_leaf = path.relative_to(ROOT / "content" / source_section).as_posix()
        source_leaf = re.sub(r"(?:/index)?\.md$", "", source_leaf)
        legacy = f"/{source_section}/{source_leaf}/"
        if source_section != public_section and legacy not in aliases:
            errors.append(f"{path.relative_to(ROOT)}: missing legacy alias {legacy}")

        relative_parent = Path(source_leaf).parent.as_posix()
        canonical_parts = [public_section]
        if relative_parent != ".":
            canonical_parts.append(relative_parent)
        canonical_parts.append(expected)
        canonical = "/" + "/".join(canonical_parts) + "/"
        if visibility == "private":
            if output(canonical).exists():
                errors.append(f"{canonical}: private route was published")
            continue
        if not output(canonical).exists():
            errors.append(f"{canonical}: canonical output is missing")
        for alias in aliases:
            if not output(alias).exists():
                errors.append(f"{alias}: legacy output is missing")

for canonical, legacy in (("/writing/", "/posts/"), ("/making/", "/projects/"), ("/learning/", "/research/"), ("/being/", "/about/"), ("/skills/", None)):
    if not output(canonical).exists():
        errors.append(f"{canonical}: section output is missing")
    if legacy and not output(legacy).exists():
        errors.append(f"{legacy}: section alias is missing")

hand_walk = output("/making/hand-walk/")
if hand_walk.exists():
    hand_walk_html = hand_walk.read_text()
    if "Hand Walk — Follow me" not in hand_walk_html or "/making/hand-walk/assets/" not in hand_walk_html:
        errors.append("/making/hand-walk/: canonical route does not contain the deployed game")

forest_crew = output("/making/forest-crew-grove-01/")
if forest_crew.exists():
    forest_crew_html = forest_crew.read_text()
    if "Forest Crew" not in forest_crew_html:
        errors.append("/making/forest-crew-grove-01/: canonical route does not contain the deployed game")

if errors:
    raise SystemExit("Canonical route verification failed:\n- " + "\n- ".join(errors))

print("canonical routes and legacy aliases verified")
