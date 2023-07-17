const { existsSync, readdirSync, readFileSync, statSync } = require("fs");
const { basename, extname, join, relative } = require("path");
const { winPath } = require("./utils");
const { absPagesPath } = require("./getPaths");
function getRoutes(opts = {}) {
  const { root, relDir = "" } = opts;
  const files = getFiles(join(root, relDir));
  const routes = files.reduce(fileToRouteReducer.bind(null, opts), []);
  return routes;
}

function fileToRouteReducer(opts, routes, file) {
  const { root, relDir = "" } = opts;
  const absFile = join(root, relDir, file);
  const stats = statSync(absFile);
  if (stats.isDirectory()) {
    const relFile = join(relDir, file);
    const layoutFile = join(root, relFile, "_layout.js");
    routes.push({
      path: normalizePath(relFile),
      routes: getRoutes({
        ...opts,
        relDir: relFile,
      }),
      ...(existsSync(layoutFile)
        ? { component: toComponentPath(root, layoutFile) }
        : {}),
    });
  } else {
    const bName = basename(file, extname(file));
    routes.push({
      path: normalizePath(join(relDir, bName)),
      exact: true,
      component: toComponentPath(root, absFile),
    });
  }
  return routes;
}
const normalizePath = (path) => {
  path = winPath(path);
  path = `/${path}`;
  path = path.replace(/\/index$/, "/");
  return path;
};
const toComponentPath = (root, absFile) => {
  return `@/${winPath(relative(join(root, ".."), absFile))}`;
};

function getFiles(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root).filter((file) => {
    if (file.charAt(0) === "_") return false;
    return true;
  });
}

let routes = getRoutes({ root: absPagesPath });
module.exports = routes;
