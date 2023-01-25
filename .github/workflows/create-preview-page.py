"""
Creates a preview page for all SVGs in /themes/*.svg, of the form:

|   |   |   |  |
|---|---|---|---|
| ![](example.svg) [Theme Name](Theme Link) | ...

etc
"""

import pathlib

COLUMN_COUNT = 4
OUT_PATH = "PREVIEW.md"


def main():
    themes = pathlib.Path("themes")
    theme_files = themes.glob("*.svg")
    theme_names = [theme.stem for theme in theme_files]
    theme_names.sort()

    with open(OUT_PATH, "w") as readme:
        readme.write("# Theme Previews\n\n")
        readme.write("|   |   |   |  |\n")
        readme.write("|---|---|---|---|\n")
        for i in range(0, len(theme_names), COLUMN_COUNT):
            row = theme_names[i : i + COLUMN_COUNT]
            row = [
                f"![]({themes / (theme + '.svg')}) <br />**[{theme}]({themes / (theme + '.svg')})**"
                for theme in row
            ]
            readme.write("| " + " | ".join(row) + " |\n")


if __name__ == "__main__":
    main()
