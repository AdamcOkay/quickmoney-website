const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/js/main.js",
  output: {
    assetModuleFilename: "[path][name][ext]",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      hash: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|jpeg|webp|gif)$/,
        type: "asset/resource",
      },
    ],
  },
};
