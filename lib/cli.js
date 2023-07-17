let Service = require("./Service");
let dev = require("./plugins/commands/dev");
let history = require("./plugins/generateFiles/history");
let routes = require("./plugins/generateFiles/routes");
let umi = require("./plugins/generateFiles/umi");
let runTimePlugin = require("./plugins/generateFiles/plugin");

(async () => {
  const service = new Service({
    plugins: [
      { id: "dev", apply: dev },
      { id: "history", apply: history },
      { id: "routes", apply: routes },
      { id: "umi", apply: umi },
      { id: "runTime", apply: runTimePlugin },
    ],
  });
  await service.run({ name: "dev" });
})();
