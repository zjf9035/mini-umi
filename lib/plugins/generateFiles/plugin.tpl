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
{{#plugins}}
import * as Plugin_{{{ index }}} from '{{{ path }}}';
{{/plugins}}

{{#plugins}}
  plugin.register({
    apply: Plugin_{{{ index }}},
    path: '{{{ path }}}',
  });
{{/plugins}}

export { plugin }