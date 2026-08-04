---
name: sync-vault
description: Diff .claude/ folder against the Obsidian vault and merge only new content. Never overwrites existing vault content. Use when the user says /sync-vault, "sync the vault", or "push to Obsidian".
---

# Sync vault

Reads .claude/, diffs against Obsidian vault, merges only new content.
Vault path: ~/Desktop/obsidian/projects_vaults/Buddha Jewelry/
Never overwrites existing content.

## Step 1 — Read source
1. CLAUDE.md
2. All .md files inside .claude/rules/ (skip SKILL.md files)
3. .claude/lessons.md

## Step 2 — Read vault
Path: ~/Desktop/obsidian/projects_vaults/Buddha Jewelry/

## Step 3 — Diff and show before writing
Already in vault → skip. New content → mark for append. Conflicts → flag first.
Show summary and wait for confirmation before writing anything.

## Step 4 — Merge
Append only new items. Never remove or overwrite existing content.

## Edge cases
Conflict: "Keep both, replace vault entry, or skip?"
Vault folder missing: create it and standard files, then populate.
