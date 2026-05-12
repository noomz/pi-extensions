# pi-no-latex

Pi extension that suppresses LaTeX inline math delimiters in **Gemma family models** (Gemma 2/3/4).

## Problem

Gemma models often emit math/arrow symbols wrapped in LaTeX delimiters:

```
context-mode is outdated (v1.0.118 $\to$ v1.0.121)
~$\approx 1\times$ (VM startup)
temperature $\geq 0.7$
```

Most terminal output bypasses LaTeX rendering — users see raw delimiters instead of `→`, `≈`, `≥`.

## Fix

When the active model id matches `/gemma/i`, this extension appends a system-prompt rule instructing the model to emit Unicode symbols directly (→ ≈ ≥ × ± etc.) and never wrap in `$...$`, `\(...\)`, `$$...$$`, or `\[...\]`.

Non-Gemma models are untouched.

## How it works

Uses pi.dev's `before_agent_start` hook (same pattern as `pi-caveman`, `mac-tools`). Inspects `event.model.id`; if Gemma, appends a short symbol-table addendum to `event.systemPrompt`.

## Install (local)

In `~/.pi/agent/settings.json`:

```json
{
  "packages": [
    "../../Projects/Opensources/pi-extensions/pi-no-latex"
  ]
}
```

Restart pi.dev.

## Configuration

None. Always-on for Gemma models, no-op for everything else.

## License

MIT
