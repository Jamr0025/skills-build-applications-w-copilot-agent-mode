# OctoFit Tracker frontend

The React 19 presentation tier uses Vite and React Router. Copy `.env.example` to `.env.local` and define `VITE_CODESPACE_NAME` with the Codespace name (without the `-8000.app.github.dev` suffix) when running in Codespaces. The API falls back to `http://localhost:8000` when the variable is unset.

## Development

```bash
npm run dev
```

The frontend runs on port `5173` and requests the backend resources under `/api/`.

## Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
