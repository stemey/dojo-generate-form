define([
    'dojo/_base/lang',
    "dojo/_base/declare"
], function (lang, declare) {

    return declare(null, {
        attribute: null,
        ctx: null,
        constructor: function (kwArgs) {
            lang.mixin(this, kwArgs);
        },
        create: function () {
            if (this.attribute.query.script) {
                var script = this.attribute.query.script;
                return (function () {
                    return eval(script)
                }.bind(this._createCtx()))();
            } else {
                return this.attribute.query.value;
            }
        },
        _createCtx: function () {
            var root = this.ctx;
            return {
                getValue: function (path) {
                    var parts = path.match(/(\/?)([\.]*)(.*)/);
                    var fromRoot = !!parts[1];
                    var depth = fromRoot ? 100 : parts[2].length;
                    var i = 0;
                    var currentRoot = root;
                    while (currentRoot.getParent && currentRoot.getParent() != null && i++ < depth) {
                        currentRoot = currentRoot.getParent();
                    }
                    var current = currentRoot.getValue();
                    var props = parts[3].split(".");
                    for (var i = 0; i < props.length; i++) {
                        if (Array.isArray(current)) {
                            current = current[parseInt(props[i])];
                        } else {
                            current = current[props[i]];
                        }

                    }
                    return current;
                }
            }
        }
    });
});
