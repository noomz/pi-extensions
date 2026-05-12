# pi-extensions

Personal collection of [pi.dev](https://pi.dev) extensions.

## Extensions

- **[pi-no-latex](./pi-no-latex)** — Suppress LaTeX inline math delimiters in Gemma model output. Forces Unicode symbols (→ ≈ × ± ≤ ≥) directly instead of `$\to$`, `$\approx$`, etc.

## Install (local dev)

Add a relative path under `packages` in `~/.pi/agent/settings.json`:

```json
{
  "packages": [
    "../../Projects/Opensources/pi-extensions/pi-no-latex"
  ]
}
```

Restart pi.dev to load.

## License

MIT — see [LICENSE](./LICENSE).
