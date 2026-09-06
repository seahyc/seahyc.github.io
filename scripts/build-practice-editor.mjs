import {build} from 'esbuild';

await build({
  entryPoints: ['projects-src/practice-editor/editor.mjs'],
  outfile: 'static/practice/editor.bundle.mjs',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2020'],
  charset: 'utf8',
  minify: true,
  legalComments: 'eof',
  sourcemap: false,
  logLevel: 'info'
});
