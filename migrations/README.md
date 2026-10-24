# eidotter migration guides

This folder holds one upgrade guide per eidotter release that has breaking or
visible changes for consumers. The guides are written for developers and AI
agents working in a consuming app who have not seen the eidotter repository.

## Naming

- `<version>.md`, for example `0.41.0.md`: one guide per minor (or major) whose
  changes a consumer can see or must act on.
- Patch releases and purely additive minors get no guide. Their notes are in
  the [CHANGELOG](https://github.com/CinimoDY/eiDotter/blob/main/CHANGELOG.md).
- A guide is written before its release is published, so it ships in that
  version's npm package.

## How to use them

1. Find your installed version (`npm ls eidotter`) and your target version.
2. Read every guide whose version is greater than your installed version and
   less than or equal to your target, oldest first. Each guide covers only the
   step from the previous minor.
3. Each guide has the same shape: who must act, how to bump, breaking and
   visible changes (each with what changed, how to find it, what to do, how to
   verify), new pieces to adopt, an ordered checklist, and pointers for
   consumers jumping several versions.

Remember the 0.x caret rule: `^0.40.2` never resolves to 0.41.0. Bump the range
explicitly.

## Where to find them

The folder ships in the npm package:

```
node_modules/eidotter/migrations/README.md
node_modules/eidotter/migrations/0.41.0.md
node_modules/eidotter/migrations/0.43.0.md
```

It is also exported, so tooling can resolve a guide by path:
`require.resolve('eidotter/migrations/0.41.0.md')`.

## Guides

| Version | Summary |
|---|---|
| [0.41.0](./0.41.0.md) | 16px floor, CSS reset and unused utilities no longer leak, `text-secondary` meaning change, Header lockup default, overlays on `DosDialog` (removed classes), focus rings; adopt `IconButton`, `DosDialog`, `DosWindow`, the favicon export and the `amber-paper` theme |
| [0.43.0](./0.43.0.md) | `Header` brand wraps instead of ellipsizing; adopt `PageShell`/`PageSection`, `Bench` and the opt-in `Header` `layout`/`rule`/`contained`/`brandCollapse` props |
