import { defineConfig } from 'tsup';
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/Icon/index.tsx'
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  external: [
    'react',
    'react-dom',
  ],
  esbuildPlugins: [sassPlugin()],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"'
    };
  }
});
