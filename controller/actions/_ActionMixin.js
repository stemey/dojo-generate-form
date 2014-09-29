define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/when",
    "dijit/form/Button",
    "dojo/i18n!../../nls/messages"
], function (declare, lang, when, Button, messages) {
// module:
//		Actions are used by Controllers to create a button and its command.


    return declare([], {
        // ctrl:
        //		the controller this actions works on
        ctrl: null,
        //  messageModule: String
        //		a prefix for the buttons label and description
        messageModule: null,
        // additional props mixed into the created button
        buttonProps: {},
        buttonType: Button,
        // summary:
        //		called once
        setup: function () {
        },
        getMessages: function () {
            return messages;
        },
        // summary:
        //		creates a button based on the configuration
        // returns: dijit/form/Button
        createButton: function () {
            var props = {onClick: lang.hitch(this, "execute")};
            if (this.buttonProps) {
                lang.mixin(props, this.buttonProps);
            }
            if (this.messageModule) {
                var keys = ['label', 'iconClass'];
                for (var key in keys) {
                    var dijitProp = keys[key];
                    var messageKey = this.messageModule + "." + keys[key];
                    if (!props[dijitProp]) {
                        props[dijitProp] = this.getMessages()[messageKey];
                    }
                }
            }
            return new this.buttonType(props);
        },
        //
        _execute: function (promise, command) {
            when(promise, lang.hitch(this, "_on" + command), lang.hitch(this, "_on" + command + "Failed"));
        }
    });
});
