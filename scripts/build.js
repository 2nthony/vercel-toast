const { build } = require('esbuild')
const postcss = require('postcss')
const fs = require('fs')
const postcssConfig = require('../postcss.config')

const baseConfig = {
  entryPoints: ['./src/index.ts'],
  minify: true
}

buildJs()
buildCss()

// js
function buildJs() {
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
    console.info('Building JS', config.outfile)
    build(config).catch(() => {
      console.error('Error to with', '`' + config.outfile + '`')
      process.exit(1)
    })
  })
}

// css
function buildCss() {
  console.info('Building CSS', '`./dist/vercel-toast.css`')
  fs.readFile('./src/style.css', (_err, css) => {
    postcss(postcssConfig.plugins)
      .process(css, { from: './src/style.css' })
      .then(({ css }) => {
        fs.writeFileSync('./dist/vercel-toast.css', css)
      })
  })
}
