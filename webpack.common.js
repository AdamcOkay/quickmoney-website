const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pages = [
  "index",
  "get",
  "return",
  "faq",
  "licenses",
  "legal",
  "about",
  "branches",
  "login",
  "signin",
  "pwd",
  "application",
];

module.exports = {
  entry: "./app/js/main.js",
  output: {
    assetModuleFilename: "[path][name][ext]",
  },

  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./app/${page}.html`,
          filename: `${page}.html`,
        })
    )
  ),

  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(svg|png|jpg|jpeg|webp|gif)$/,
        type: "asset/resource",
      },
    ],
  },
};
