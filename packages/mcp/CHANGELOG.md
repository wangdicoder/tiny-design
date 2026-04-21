# @tiny-design/mcp

## 1.6.2

### Patch Changes

- Add seed-driven token foundations to `@tiny-design/tokens` with an internal `primitive -> semantic -> component` model, a shared `compile-brand-theme` runtime export, stricter build validation, and richer registry metadata including resolved token values for downstream tooling. - [#128](https://github.com/wangdicoder/tiny-design/pull/128) [`4444b58`](https://github.com/wangdicoder/tiny-design/commit/4444b585720bb5339d3b965dc4541fee305141ef)

  Fix `@tiny-design/mcp` token extraction so MCP clients receive concrete resolved token values instead of unresolved token references.

## 1.6.1

### Patch Changes

- Add @tiny-design/cli package for querying component metadata, docs, demos, tokens, and icons from the terminal. Extract shared extraction logic into internal @tiny-design/extract package. Add CLI docs page and reorganize Guide menu into grouped sections. - [#79](https://github.com/wangdicoder/tiny-design/pull/79) [`5b6860a`](https://github.com/wangdicoder/tiny-design/commit/5b6860ab68e3a3db49c21f8ef1450d0454e27429)
