import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages: https://angelg200205.github.io/odal-english-practice/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/odal-english-practice/',
})
