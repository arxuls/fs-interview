---
name: code-style
description: The two code style rules that this project's linter cannot enforce
paths: ["**/*.ts", "**/*.tsx"]
---

# Code style in this project

- **`undefined` means absence.** Use `null` only at a boundary that produces it,
  such as a nullable Drizzle column. Convert at that boundary and never deeper.
- **Import through a workspace alias.** A deep relative path breaks when a file
  moves, and it hides which package owns the symbol. No lint rule catches this
  one.
- **The linter carries every other rule.** Run `pnpm check`. It states the
  function form, the array type, the export form, the type-only import, and the
  type alias. Do not restate a lint rule in prose.
