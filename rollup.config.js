import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: 'src/DNA.js',
  output: {
    file: "dist/DNA.js",
    format: 'iife',
    name: 'DNA', // the global which can be used in a browser
  },
  plugins: [
    commonjs(), // this is required to resolve performance-now
    nodeResolve(), // this is required to include dependencies in the bundle
    typescript({
      typescript: require('typescript'),
    }),
    terser() // minification
  ]
};