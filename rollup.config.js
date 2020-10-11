import typescript from 'rollup-plugin-typescript2';
import {terser} from "rollup-plugin-terser";

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
    }),
    terser()
  ]
};