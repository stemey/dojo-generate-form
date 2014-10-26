define([ "dojo/_base/declare",
    "dojo/text!./inline-decorator.html", "./DecoratorWidget"
], function (declare, template, DecoratorWidget) {
// module:
//		gform/group/InlineDecoratorWidget

    return declare("gform.group.InlineDecoratorWidget", [ DecoratorWidget ], {
        templateString: template

    });

});
