# ODAL Staff English Practice

English grammar practice for Japanese staff at ODAL Rent-a-Car (Naha Airport / Tomigusuku).

**Live:** https://angelg200205.github.io/odal-english-practice/

- Vite + React + TypeScript
- Scenarios in `src/data/scenarios.json` (teacher-editable)
- Japanese (日本語) hints + glossary
- Progress saved in browser `localStorage` (no login)
- Deployed via GitHub Actions → GitHub Pages

## Local development

```bash
npm install
npm run dev
```

## Republish after editing scenarios (Viktoria)

1. Edit JSON under `src/data/` (`scenarios.json`, `topics.json`, and/or `glossary.json`).
2. Commit and push to `main`.
3. The **Deploy to GitHub Pages** workflow rebuilds and publishes automatically.
4. Refresh https://angelg200205.github.io/odal-english-practice/ after the Action turns green.

See [docs/viktoria-add-scenario.md](docs/viktoria-add-scenario.md) for how Viktoria can add scenarios.
