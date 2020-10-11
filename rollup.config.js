import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/DNA.js',
  output: {
    file: "dist/DNA.js",
    format: 'iife',
    name: 'DNA' // the global which can be used in a browser
  },
  plugins: [
    typescript({
      typescript: require('typescript'),
    })
  ]
};