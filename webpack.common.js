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
  "id",
  "loans",
  "loans-success",
  "loans-empty",
  "loans-decline",
  "loans-inprogress",
  "loans-extend",
  "profile",
  "cards",
  "bank-accounts",
  "contracts",
];

module.exports = {
  entry: "./app/js/main.js",
  output: {
    assetModuleFilename: "assets/[name].[hash][ext][query]",
  },

  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./app/${page}.html`,
          filename: `${page}.html`,
          minify: {
            removeRedundantAttributes: false, // do not remove type="text"
          },
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
