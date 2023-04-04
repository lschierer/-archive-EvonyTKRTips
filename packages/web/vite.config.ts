import { resolve } from 'path';
import { defineConfig } from 'vite';
import hugoPlugin from 'vite-hugo-plugin'

console.log(typeof(hugoPlugin));

// Root directory of our application
const appDir = __dirname;

// The directory where hugo builds it's files.
const hugoOutDir = resolve(appDir, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //hugoPlugin({ appDir, hugoOutDir })
  ], 
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: /^lit/,
    },
  },
})

