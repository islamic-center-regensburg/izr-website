---
name: commit-changes
description: Analyzes uncommitted changes, groups related files by topic/feature and dependency level, creates well-structured commits with meaningful messages, and uses one feature branch per logical area. Respects both inter-feature dependencies (features commit in order) and intra-feature commit grouping (files grouped with dependency awareness within each feature). Use when the user asks to commit, save changes, wrap up work, or split work into feature branches.
allowed-tools: Bash, Read
---

# Commit Changes — Smart Grouping with Dependency Awareness

**Invoke:** `/commit-changes` when asked to commit or save work, organize uncommitted changes, or split changes into feature branches.

## Purpose

When many files have changed across unrelated topics and features, split them into **logical, atomic commits ordered by dependency** instead of one giant commit. Each commit should represent **one coherent change**, and each feature should be its own branch.

### Modes

1. **Branch-per-feature mode** (primary, recommended) — split the changes into **separate feature areas** ordered by dependency level, create one branch per feature area, group and commit that area's files within its branch (respecting intra-feature dependencies), merge back to the starting branch, then move to the next feature area. This produces one branch (and one merge commit) per feature area, with commits inside each branch also ordered by dependency.
2. **Direct mode** — group and commit straight onto the current branch (deprecated; useful only for trivial changes with no cross-feature dependencies).

## Why Dependency-Aware Commits & No `--no-verify`?

If the repo uses pre-commit hooks (e.g. `.pre-commit-config.yaml` with prettier, eslint --fix, shellcheck, conventional-commit message check), they enforce code quality **at commit time**, not after.

**Old approach (branch-per-commit with `--no-verify`)**: Bypassed hooks, allowing intermediate commits to be malformed. ❌

**New approach (branch-per-feature with dependency ordering and `--verify`)**:

- ✅ Pre-commit hooks run on every commit, catching errors early.
- ✅ Features commit in dependency order: foundation first, then consumers.
- ✅ Within each feature branch, intra-feature commits also respect dependencies (e.g., store setup before pages using it).
- ✅ Each commit is fully valid and hook-compliant before merging.
- ✅ Merge commits are clean and represent coherent feature boundaries.

## Procedure (branch-per-feature mode — PRIMARY)

This is the recommended workflow. Split changes into **feature areas**, ordered by dependency, with one branch per area. Within each branch, commits are also grouped and ordered by dependency.

### 1. Record the starting branch

```bash
git branch --show-current
```

Call this `$START_BRANCH`. Every feature branch merges back into `$START_BRANCH` — **never** `main` (unless `main` happens to be `$START_BRANCH`), regardless of what `$START_BRANCH` is.

### 2. Identify feature areas and their dependencies

Survey the changes (same as direct mode):

```bash
git status --short
git diff --stat
```

Inspect file paths and read diffs where grouping is ambiguous. **Cluster commits into feature areas** — coherent bodies of work that deserve their own branch. A feature area typically contains multiple related files that would span 2–5 commits within the branch.

**Key:** Identify inter-feature **dependencies** — which feature areas must commit _before_ which others. For example:

- Foundation (packages, config, types) — depends on nothing.
- Store/state slices — depends on foundation.
- Shared components — depends on foundation + store.
- Routes — depends on routing config + shared components.
- Pages — depends on routes + store.
- i18n / translations — depends on pages/routes that consume it.

**Intra-feature dependencies** — within a single feature branch, some commits may depend on earlier commits in the same feature. Order them accordingly (e.g., store setup before pages using it within the same feature branch).

Present the feature-area breakdown to the user **before creating any branch**, with:

- Feature name and proposed branch name (`feat/<kebab-case>`)
- Dependency level
- Which features it depends on
- The commit groups (and their order) it will contain inside the branch

Example:

```
Feature areas identified (ordered by dependency):

1. [Level 0] chore: Foundation & Config
   Branch: feat/foundation-config
   Depends on: (nothing)
   Commits:
     - chore: upgrade packages and configure TypeScript
     - feat: add shadcn UI primitives

2. [Level 1] feat: Store Infrastructure
   Branch: feat/app-store
   Depends on: feat/foundation-config
   Commits:
     - feat: add store infrastructure
     - feat: add store slices

3. [Level 2] feat: Routing & Layout
   Branch: feat/routing-layout
   Depends on: feat/app-store
   Commits:
     - feat: add routing configuration
     - feat: add route structure and protected layout

...
```

Get confirmation (or ask for adjustments) on feature areas, branch names, and dependency order **before proceeding**.

### 3. For each feature area, in dependency order

Do **not** start the next feature area until the current one's merge is complete and you're back on `$START_BRANCH`.

#### 3.1. Create the feature branch

Always run `git status` first:

```bash
git status
git checkout "$START_BRANCH"   # no-op on first area, required before every area after
git checkout -b <feature-branch-name>
```

#### 3.2. Group and commit files within this feature (dependency-aware)

**Within the feature branch**, group files into commits respecting **intra-feature dependencies** (files that other files in the same feature depend on commit first).

For each commit group:

```bash
git reset                                    # unstage everything
git add <file1> <file2> ...                 # stage this commit group
git diff --cached --stat                    # preview
git commit -m "<type>: <title>"             # hooks will run (no --no-verify)
```

Repeat for each commit group in the feature, in dependency order. **Let hooks run** — they'll catch issues and fix them (eslint --fix, prettier --write). If a hook fails after auto-fix, inspect the error and adjust; then `git add -A` and `git commit --amend`.

#### 3.3. Merge back into the starting branch

```bash
git checkout "$START_BRANCH"
git merge --no-ff <feature-branch-name>
```

Use `--no-ff` so each feature branch's history is preserved as a distinct merge commit.

If the merge has conflicts, stop and ask the user how to resolve them. Resolve conflicts before moving to the next feature area.

#### 3.4. Confirm return to the starting branch

```bash
git branch --show-current
```

Must print `$START_BRANCH` before starting the next feature area.

#### 3.5. Ask about branch cleanup

After successful merge, ask the user: "Delete merged branch `<feature-branch-name>`?" — don't delete unprompted (user may want to keep it).

### 4. Verify the final state

After all feature areas are merged:

```bash
git log --oneline --graph -n 30
git status
git branch --show-current
```

Confirm the graph shows one merge commit per feature area, in dependency order, all merged into `$START_BRANCH`, and that `$START_BRANCH` is checked out.

## Procedure (direct mode — DEPRECATED)

Only use for trivial changes with no cross-feature dependencies. Otherwise, use **branch-per-feature mode** above.

## Commit Message Format

Follow **Conventional Commits**, matching the repo's actual history. Before writing messages, run `git log --oneline -n 30` to check whether the repo uses scopes (`feat(scope): ...`) or plain types (`feat: ...`), and match that convention.

```
<type>: <short title, imperative, lowercase after the colon, <=72 chars>

<optional body: what & why, wrapped at 72 chars>
```

Don't invent a `(scope)` segment if the repo's existing history and `conventional-pre-commit` config don't use one.

### Types

| Type       | Use for                                 |
| ---------- | --------------------------------------- |
| `feat`     | New user-facing feature or component    |
| `fix`      | Bug fix                                 |
| `refactor` | Code change, no behavior change         |
| `perf`     | Performance improvement                 |
| `test`     | Adding/updating tests/stories only      |
| `docs`     | Documentation / agent instructions only |
| `chore`    | Tooling, deps, config                   |
| `style`    | Formatting, whitespace                  |
| `ci`       | CI/CD pipeline changes                  |
| `build`    | Build system changes                    |

### Examples

Good:

```
feat: add selectable card group with gradient-border selection state

Generic base for any set of mutually-exclusive selectable cards,
used by multiple picker components across the app.
```

```
fix: restore activeIndex prop on StepsIndicator

A prior edit hardcoded the active step to 0, breaking per-step
highlighting; the component now takes activeIndex again.
```

```
chore: add i18next and react-i18next with typed resources
```

Bad:

```
❌ update stuff
❌ WIP
❌ Fixed the bug
❌ feat(ui): added new component   (only bad if the repo doesn't use scopes)
```

## Edge Cases

### Untracked files

Include with `git add`. If unclear whether the file should be committed, **ask the user**.

### Deleted files

Stage with `git add <path>` or `git rm <path>`. Include in the most relevant commit (e.g. a page's deleted old route alongside the commit that replaces it).

### Renames

Git detects renames automatically if content is similar. Stage both old and new paths.

### Partial file changes belonging to different commits

Use `git add -p <file>` to stage hunks. **Ask the user first** — this is disruptive if unexpected.

### Generated files (e.g. route trees, API clients, type manifests)

Never a standalone commit. Bundle with whatever source change regenerated them.

### Everything is one topic

If genuinely coherent, make **one** commit. Don't split artificially.

## Guardrails

**DO:**

- ✅ Identify feature areas **and their inter-feature dependencies** before creating any branch
- ✅ Commit feature areas in dependency order (foundation first, then consumers)
- ✅ Within each feature branch, order commits by intra-feature dependencies
- ✅ **Let pre-commit hooks run** — they fix formatting and validate (no `--no-verify`)
- ✅ Always show the plan and get confirmation before committing
- ✅ Read diffs, not just paths, when grouping is ambiguous
- ✅ Keep commits atomic and revertable
- ✅ Use imperative mood ("add", not "added")
- ✅ In branch mode, merge back into the branch the user started on — never a different long-lived branch
- ✅ Run `git status` before any branch-switching command

**DO NOT:**

- ❌ Use `--no-verify` — let hooks do their job
- ❌ Commit feature areas out of dependency order
- ❌ Force push or rewrite history
- ❌ Include secrets, `.env` files, or `node_modules/` — abort and warn
- ❌ Group unrelated changes just to reduce commit count
- ❌ Use vague messages like "updates" or "fixes"
- ❌ Amend or rebase without explicit user request
- ❌ Add a `(scope)` to commit types if the repo's history doesn't use them
- ❌ Merge into a branch other than `$START_BRANCH` — confirm the intended target with the user
- ❌ Delete the feature branch after merging without asking first
- ❌ Create the next feature branch before the current one merges and you're back on `$START_BRANCH`

## Safety Check Before Committing

Before staging, scan for suspicious content:

```bash
git diff --cached | grep -iE '(password|secret|api[_-]?key|token|BEGIN.*PRIVATE KEY)' || true
```

If matches appear, **stop and ask the user** whether to proceed.

## Quick Reference

```bash
# Initial survey
git status --short
git diff --stat

# Identify feature areas and dependencies (ask user for confirmation)
# ... present feature areas, branch names, dependency order ...

# Per feature area (repeat cycle)
git status
git checkout "$START_BRANCH"
git checkout -b feat/<area-topic>

# Within feature branch: group & commit (repeat per commit group)
git reset
git add <files>
git diff --cached --stat
git commit -m "type: title"                # hooks run; let them fix issues

# Merge feature back to start branch
git checkout "$START_BRANCH"
git merge --no-ff feat/<area-topic>
git branch --show-current                  # confirm on $START_BRANCH

# --- repeat for next feature area ---

# Verify at end
git log --oneline --graph -n 30
git status
```

## Inter-Feature Dependency Examples

**Foundation** → **Store** → **Routes** → **Pages**

- Feature 1 (Foundation): Packages, config, types. Depends on: (nothing)
- Feature 2 (Store): Store slices, validators. Depends on: Feature 1
- Feature 3 (Routes): Route structure, guards. Depends on: Features 1 + 2
- Feature 4 (Pages): Page implementations. Depends on: Features 1 + 2 + 3
- Feature 5 (i18n): Translation files. Depends on: Features 3 + 4

**Within each feature branch**, commits are also ordered (e.g., within Feature 2, store setup commits before page-specific slices).
