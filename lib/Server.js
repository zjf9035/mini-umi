const express = require("express");
const http = require("http");
const webpack = require("webpack");
const { join } = require("path");
const webpackDevMiddleware = require("webpack-dev-middleware");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackConfig = require("./webpack.config.js");
const { absTmpPath, absSrcPath } = require("./getPaths");
class Server {
  constructor() {
    this.app = express();
  }
  setupDevMiddleware() {
    webpackConfig.entry = join(absTmpPath, "umi.js");
    webpackConfig.resolve.alias["@"] = absSrcPath;
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({ template: join(__dirname, "index.html") })
    );
    const compiler = webpack(webpackConfig);
    const devMiddleware = webpackDevMiddleware(compiler, { writeToDisk: true });
    this.app.use(devMiddleware);
    this.app.use((req, res) => {
      res.send(
        compiler.outputFileSystem.readFileSync(
          join(__dirname, "dist/index.html"),
          "utf8"
        )
      );
    });
    return devMiddleware;
  }
  async start() {
    const devMiddleware = this.setupDevMiddleware();
    devMiddleware.waitUntilValid(() => {
      this.listeningApp = http.createServer(this.app);
      this.listeningApp.listen(8000, () => {
        console.log(`http server started at port 8000`);
      });
    });
  }
}
module.exports = Server;
