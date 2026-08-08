import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/, so
// production assets need that prefix. Dev keeps the root path, otherwise the
// local server would only answer on /NASA-Research/ for no benefit.
//
// Routing is unaffected either way: the app is hash-routed, so no server
// rewrite rules and no 404 fallback are required.
const REPO_BASE = '/NASA-Research/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? REPO_BASE : '/',
  plugins: [react()],
  server: { port: 5180 },
}))
