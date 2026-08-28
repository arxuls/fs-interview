---
name: tests
description: Conventions for every test file in this project
paths: ["**/*.test.ts", "**/*.spec.ts", "**/*.integration.test.ts"]
---

# Tests in this project

- **`test(...)` and `it(...)` name the same function.** Choose one name for a
  file and keep that name for the whole file. Write it at the top level.
  Do not nest `describe`.
- **Write the setup inline.** One exception exists. The life cycle of the harness
  stays in a hook, that is `beforeAll` to start the containers, `beforeEach` to
  call `reset()`, and `afterAll` to close the containers.
- **Never assert incidental copy.** A description of a tool, a hint of usage, and
  a warning are configuration. Assert the behaviour or the structured contract.
- **Never assert a value that you import from the module under test.** Both sides
  read one source, so the test proves nothing.
- **Never assert a moving value.** A count of lines and a count of commits each
  pass one time and fail after the next edit.
- **A test runs offline.** Use a local fake. Do not reach a service of a third
  party.
