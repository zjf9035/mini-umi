const PluginAPI = require("./PluginAPI");
const { AsyncParallelHook } = require("tapable");
class Service {
  constructor(opts) {
    this.commands = {};
    this.plugins = opts.plugins;
    this.hooksByPluginId = {};
    this.hooks = {};
  }
  async init() {
    for (let plugin of this.plugins) {
      const pluginAPI = new PluginAPI({ id: plugin.id, service: this });
      pluginAPI.onGenerateFiles = (fn) => {
        pluginAPI.register({ pluginId: plugin.id, key: "onGenerateFiles", fn });
      };
      plugin.apply(pluginAPI);
    }
    Object.keys(this.hooksByPluginId).forEach((id) => {
      const hooks = this.hooksByPluginId[id];
      hooks.forEach((hook) => {
        const { key } = hook;
        hook.pluginId = id;
        this.hooks[key] = (this.hooks[key] || []).concat(hook);
      });
    });
  }

  async applyPlugins(opts) {
    const hooks = this.hooks[opts.key] || [];
    const tEvent = new AsyncParallelHook(["_"]);
    for (const hook of hooks) {
      tEvent.tapPromise({ name: hook.pluginId }, hook.fn);
    }
    return await tEvent.promise();
  }
  async run(args) {
    this.init();
    return this.runCommand(args);
  }
  async runCommand({ name }) {
    const command = this.commands[name];
    const { fn } = command;
    return fn();
  }
}
module.exports = Service;
