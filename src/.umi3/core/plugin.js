class Plugin {
    constructor(){
        this.hooks = {};
    }
    register(plugin) {
        Object.keys(plugin.apply).forEach((key) => {
            if (!this.hooks[key]) this.hooks[key] = [];
            this.hooks[key] = this.hooks[key].concat(plugin.apply[key]);
        });
    }
    applyPlugins({ key, args }) {
        const hooks = this.hooks[key]  || [];
        hooks.forEach((hook) => {
            hook(args);
        });
    }
}

const plugin = new Plugin();
import * as Plugin_0 from '/Users/zhujifei/code/2023-secode/umi乞丐版/mini-umi/src/app.js';

  plugin.register({
    apply: Plugin_0,
    path: '/Users/zhujifei/code/2023-secode/umi乞丐版/mini-umi/src/app.js',
  });

export { plugin }