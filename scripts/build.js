const { build } = require('esbuild')
const postcss = require('postcss')
const fs = require('fs')

const baseConfig = {
  entryPoints: ['./src/index.ts'],
  minify: true
}

// js
;[
  // esm
  {
    ...baseConfig,
    outfile: './dist/vercel-toast.esm.js',
    minify: false
  },
  // iife
  {
    ...baseConfig,
    outfile: './dist/vercel-toast.js',
    bundle: true,
    minify: false,
    format: 'iife',
    globalName: 'toast'
  },
  // iife-min
  {
    ...baseConfig,
    outfile: './dist/vercel-toast.min.js',
    bundle: true,
    format: 'iife',
    globalName: 'toast'
  }
].forEach(config => {
  console.info('Building', config.outfile)
  build(config).catch(() => {
    console.error('Error to with', '`' + config.outfile + '`')
    process.exit(1)
  })
})

// css
fs.readFile('./src/style.css', (_err, css) => {
  postcss([require('postcss-preset-env')({ stage: 0 })])
    .process(css, { from: './src/style.css' })
    .then(({ css }) => {
      fs.writeFileSync('./dist/vercel-toast.css', css)
    })
})
