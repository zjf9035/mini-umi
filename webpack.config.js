const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const cwd = process.cwd();
module.exports = {
  mode: "development",
  entry: "./src/.umi3/umi.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  devtool: "cheap-module-source-map",
  resolve: {
    alias: {
      "@": path.join(cwd, "src"),
    },
  },
  devServer: {
    historyApiFallback: true,
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
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/.umi2/index.html",
    }),
  ],
};
