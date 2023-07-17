let { readFileSync } = require("fs");
let { join } = require("path");
let writeTmpFile = require("../../writeTmpFile");
let Mustache = require("mustache");
let routes = require("../../getRoutes");
const plugin = (api) => {
  api.onGenerateFiles(async () => {
    const routesTpl = readFileSync(join(__dirname, "routes.tpl"), "utf8");
    writeTmpFile({
      path: "core/routes.js",
      content: Mustache.render(routesTpl, {
        routes: JSON.stringify(routes, replacer, 2).replace(
          /\"component\": (\"(.+?)\")/g,
          (global, m1, m2) => {
            return `"component": ${m2.replace(/\^/g, '"')}`;
          }
        ),
      }),
    });
  });
};
function replacer(key, value) {
  switch (key) {
    case "component":
      return `require('${value}').default`;
    default:
      return value;
  }
}
module.exports = plugin;
