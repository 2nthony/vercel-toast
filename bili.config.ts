import { Config } from 'bili'

export default {
  input: {
    toast: 'src/index.ts'
  },
  output: {
    moduleName: 'toast',
    format: ['umd', 'umd-min', 'esm'],
    fileName({ format, minify }, defaultName) {
      if (format === 'umd') {
        return minify ? '[name].min.js' : '[name].js'
      }
      if (format === 'esm') {
        return '[name].esm.js'
      }
      return defaultName
    }
  },
  babel: {
    minimal: true
  },
  plugins: {
    typescript2: {
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext'
        },
        include: ['src/']
      }
    }
  }
} as Config
