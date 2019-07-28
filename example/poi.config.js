module.exports = {
  entry: 'example/index.js',
  output: {
    dir: 'example/dist'
  },
  plugins: ['@poi/typescript'],
  chainWebpack(config) {
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm')
  },
  publicFolder: 'example/public'
}
