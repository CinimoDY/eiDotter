---
title: "A node_modules symlink escapes a dir-only gitignore and gets committed"
date: 2026-06-25
last_updated: 2026-06-25
category: developer-experience
module: eidotter
problem_type: developer_experience
component: tooling
severity: medium
applies_when:
  - "Symlinking node_modules into a git worktree to reuse the main checkout's install"
  - "Running `git add -A` / `git add .` inside a worktree you set up by hand"
  - "A `.gitignore` entry ends in a trailing slash (e.g. `node_modules/`)"
  - "A directory you expect to be ignored is a symlink, not a real directory"
  - "Reviewing why a fresh clone has a dangling absolute-path symlink"
related_components:
  - development_workflow
  - documentation
tags:
  - git
  - gitignore
  - git-worktree
  - symlink
  - node_modules
  - ci
---

# A node_modules symlink escapes a dir-only gitignore and gets committed

## Context

`.gitignore` patterns that end in a slash match **directories only**. A *symlink* named `node_modules` is a regular file as far as git is concerned, so a `node_modules/` pattern does **not** ignore it. A blanket `git add -A` will then stage and commit the symlink — silently adding a `120000` (symlink) blob to the tree.

**Concrete incident.** While clearing a PR backlog in eidotter (2026-06-25), several PRs were processed in isolated `git worktree`s. To run Storybook and Jest in a worktree without a second `npm install`, the worktree's `node_modules` was symlinked to the main checkout:

```bash
ln -s /mnt/d/coding/eidotter/node_modules node_modules
```

During conflict resolution a `git add -A` staged everything — including that symlink, because `.gitignore` only had `node_modules/` (trailing slash). The symlink rode a squash-merge into `main` (PR #433, commit `600d04e`) as:

```
120000 blob <sha>    node_modules   ->   /mnt/d/coding/eidotter/node_modules
```

**CI did not catch it** because `npm ci` deletes `node_modules` before installing, replacing the committed symlink with a real directory — so every CI job and every PR after it stayed green. The damage only surfaces on a **fresh clone**: git recreates a `node_modules` symlink pointing at an absolute path that does not exist on that machine, which can break `npm install`, editors, and any tool that walks `node_modules`.

Fixed in PR #451: `git rm --cached node_modules` + a bare `node_modules` ignore line.

## Guidance

### 1. A trailing slash means "directory only" — drop it to also catch symlinks

```gitignore
node_modules/      # matches the directory, NOT a symlink named node_modules
node_modules       # bare pattern matches a dir OR a file/symlink at any depth
```

Keep both for clarity, or just use the bare form. The bare `node_modules` is what prevents a symlink from sneaking through.

### 2. Never `git add -A` in a worktree you hand-symlinked

When you create symlinks (or any throwaway scaffolding) inside a worktree, stage explicit paths instead of everything:

```bash
git add src/components/Foo/Foo.css package.json   # explicit — safe
# not: git add -A   # will sweep up the node_modules symlink
```

If you must use `-A`, add the bare `node_modules` ignore line **before** the first `add`.

### 3. Detecting an already-committed symlink

```bash
git ls-files node_modules                 # prints "node_modules" if tracked
git ls-tree HEAD node_modules             # mode 120000 == symlink blob
git log --oneline -- node_modules         # which commit introduced it
```

Remove it without deleting your working install:

```bash
git rm --cached node_modules              # untrack the symlink; keep the dir/symlink on disk
git check-ignore node_modules             # confirm it's now ignored
```

### 4. Why CI is a false friend here

`npm ci` runs `rm -rf node_modules` first, so a committed symlink is invisible to every CI job — the build, tests, and axe gate all pass. Green CI is **not** evidence the tree is clean of this class of mistake. Audit `git ls-files` for stray symlinks separately (e.g. when a fresh `git status` shows `D node_modules` after a local `npm install` replaced the tracked symlink with a real directory).

## Related notes

- eidotter's `.gitignore` uses **CRLF** line endings. Edit it with a CRLF-preserving tool — a naive editor write normalizes the whole file to LF, producing a noisy 40+-line diff and churning the auto-managed `BEGIN/END CURATED ICONS` block that `scripts/icons/build-barrels.mjs` rewrites.
- Worktrees are the right tool for parallel PR work; the hazard is the manual `node_modules` symlink + a blanket `add`, not worktrees themselves.
