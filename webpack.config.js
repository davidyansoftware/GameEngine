const path = require("path");

module.exports = {
  entry: "./src/DNA.js",
  output: {
    library: "DNA",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    filename: "DNA.js",
    globalObject: "typeof self !== 'undefined' ? self : this"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  }
};
