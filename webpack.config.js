const path = require("path");

module.exports = {
  entry: "./src/DNA.js",
  output: {
    library: "DNA",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "dist"),
    filename: "DNA.js"
  }
};
