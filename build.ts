import { rm } from 'node:fs/promises'
const outdir = './dist'

await rm(outdir, { recursive: true, force: true })

await Bun.build({
  entrypoints: ['./index.ts'],
  outdir: outdir,
  format: 'esm',
  minify: true,
  naming: "mini-vue.esm.js"
})