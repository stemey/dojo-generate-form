define([
    "dojo/_base/lang",
    "dojo/_base/declare",
    "./DecoratorWidget",
    "./InlineDecoratorWidget"
], function (lang, declare, DecoratorWidget, InlineDecoratorWidget) {
// module:
//		gform/DecoratorFactory
    return declare("gform.DecoratorFactory", null, {
        // summary:
        //		the decoratorFactory creates the decorators wrapped around the attributes.
        constructor: function (kwArgs) {
            lang.mixin(this, kwArgs);
        },
        decoratorMappings: {
            'inline': InlineDecoratorWidget,
            'default': DecoratorWidget
        },
        create: function (attribute, modelHandle, decorator) {
            // summary:
            //		creates the decorator widget
            // attribute: Object
            //		the attribute meta data
            // modelHandle: dojo/Stateful
            //		the modelHandle containing state, messag meta data. These should be dislayed by the decorator
            // returns: dijit/_Container
            //		The widget for the atribute will be added as only child.

            if (decorator === 'none') {
                return null;
            } else {
                var constructor = this.decoratorMappings[decorator || 'default'];
                if (!constructor) {
                    throw new Error("unknown decorator " + decorator);
                }
                return new constructor({meta: attribute, modelHandle: modelHandle});
            }

        },
        createBadge: function (modelHandle) {
            if (modelHandle.errorCount > 0) {
                return "<span class='errorTooltipNode'>" + modelHandle.get("errorCount") + "</span>";
            } else if (modelHandle.changedCount > 0) {
                return "<span class='changesTooltipNode'>" + modelHandle.get("changedCount") + "</span>";
            } else {
                return "";
            }
        }
    });
});
