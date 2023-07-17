const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const cwd = process.cwd();
module.exports = {
  mode: "development",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  devtool: false,
  resolve: {
    alias: {},
  },
  devServer: {
    historyApiFallback: {
      index: "index.html",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
};
