define([
	"dojo/_base/declare",
	"dijit/TitlePane",
	"dojo/text!./TitlePane.html",
	"../group/_DecoratorMixin"
], function (declare, TitlePane, templateString, _DecoratorMixin) {

	return declare("gform.TitlePane", [TitlePane, _DecoratorMixin], {
		baseClass: "dijitTitlePane",
		templateString: templateString
	});

});
