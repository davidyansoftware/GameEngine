const path = require("path");

module.exports = {
  entry: "./src/DNA.js",
  output: {
    filename: "DNA.js",
    path: path.resolve(__dirname, "dist")
  }
};
