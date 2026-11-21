import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    // Worktrees under .claude/ hold their own copy of every test.
    exclude: [...configDefaults.exclude, '.claude/**'],
  },
})
