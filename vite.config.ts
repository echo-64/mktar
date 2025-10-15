import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    copyPublicDir: false,
    outDir: './dist',
    minify: 'esbuild',
    lib: {
      name: 'mktar',
      entry: './src/mktar.ts',
      formats: ['es', 'umd'],
      fileName: (format, name) => `${name}.${format}.js`,
    },
  }
});
