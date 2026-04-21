---
'@tiny-design/tokens': minor
'@tiny-design/mcp': patch
---

Add seed-driven token foundations to `@tiny-design/tokens` with an internal `primitive -> semantic -> component` model, a shared `compile-brand-theme` runtime export, stricter build validation, and richer registry metadata including resolved token values for downstream tooling.

Fix `@tiny-design/mcp` token extraction so MCP clients receive concrete resolved token values instead of unresolved token references.
