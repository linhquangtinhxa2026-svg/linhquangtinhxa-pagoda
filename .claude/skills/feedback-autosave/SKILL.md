---
name: feedback-autosave
description: Auto-detect corrections, preferences, and technical lessons during a session and save them to .claude/rules/ or .claude/lessons.md. Activate when the user corrects something, states a preference, says "remember this", "note this", "save this", or "update the rules".
---

# Feedback auto-save

## Auto-detect triggers
- User corrects something: "don't do X", "that's wrong", "not like that"
- User states a preference: "I prefer X", "always use X", "never use X"
- User expresses frustration: "why did you...", "stop doing..."
- A bug is discovered and fix is agreed on
- A technical decision is made after discussion

## Explicit triggers
- "remember this" / "note this" / "save this" / "update the rules"

## Classification
Rule → .claude/rules/ (how Claude should behave: style, patterns, architecture)
Lesson → .claude/lessons.md + one-line summary in CLAUDE.md (what was discovered)
If both: rule to rules/, full context to lessons.md

## Which rules file to append to?
Match the rule to the closest existing file in .claude/rules/:
- Code style / naming → code-style.md
- Component patterns / structure → conventions.md
- Data fetching → data-fetching.md
- State management → state.md
- Forms → forms.md
- Backend / auth / Pocketbase → backend.md
- Doesn't fit any existing file → create a new .md file in .claude/rules/

## Flow
Step 1 — Confirm before saving:
📝 Type: [Rule / Lesson] | File: [.claude/rules/[file].md / .claude/lessons.md]
Entry: > [Concise — imperative for rules, past tense for lessons]
Should I save it? (yes / no / edit)

Step 2 — Write to .claude/ only. Never write to vault directly.
Rule → append to correct .claude/rules/[file].md
Lesson → append full context block to .claude/lessons.md
         + one-line summary to CLAUDE.md ## Lessons (summary)

Step 3 — Show what was written. Remind: run /sync-vault for Obsidian.

## Edge cases
Duplicate: flag — Replace, add both, or skip?
Vague: ask how to phrase it.
Multiple learnings: list all, approve each individually.
