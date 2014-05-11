define([
    "dojo/_base/declare"
], function (declare) {


    return declare([], {
        defaultActions: [],
        typeActions: {},
        getActions: function (schema) {
            // summary:
            //      create actions
            // schema:
            //      the schema of the editor
            var actions = this.defaultActions;
            if (schema.code && this.typeActions[schema.code]) {
                actions = actions.concat(this.typeActions[schema.code]);
            } else if (schema.actions) {
                actions = actions.concat(schema.actions);
            }
            return actions;
        },
        add: function(Action) {
            this.defaultActions.push(Action);
        }

    });


});
