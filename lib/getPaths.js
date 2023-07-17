const { existsSync, statSync } = require("fs");
const { join } = require("path");
function isDirectoryAndExist(path) {
  return existsSync(path) && statSync(path).isDirectory();
}
let cwd = process.cwd();
let absSrcPath = cwd;
if (isDirectoryAndExist(join(cwd, "src"))) {
  absSrcPath = join(cwd, "src");
}
const absPagesPath = join(absSrcPath, "pages");
const tmpDir = ".umi3";
const absTmpPath = join(absSrcPath, tmpDir);
module.exports = {
  absSrcPath,
  absPagesPath,
  tmpDir,
  absTmpPath,
};
