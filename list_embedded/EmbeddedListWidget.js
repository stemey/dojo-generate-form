define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
	"dijit/_Container", "dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./embedded_list_attribute.html", //
	"dojo/i18n!../nls/messages", "../layout/_LayoutMixin", "../group/_GroupMixin"
], function (lang, declare, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, template, messages, _LayoutMixin, _GroupMixin) {

	return declare("...EmbeddedListWidget", [ _WidgetBase, _Container,
		_TemplatedMixin, _WidgetsInTemplateMixin, _LayoutMixin, _GroupMixin ], {
		templateString: template,
		messages: messages,
		group: null,
		typeProperty: null,
		_addElement: function () {
			//var model = this.target.createElement();	
			//var type=this.attribute.validTypes[0].code;

			var newValue = {};
			if (this.typeProperty) {
				newValue[this.typeProperty] = this.group.code;
			}
			//if (this.attribute.validTypes.length>1) {
			//	updateModelHandle.updatePolyObject(this.attribute,newValue,newModelHandle, this.editorFactory);
			//}else{
			//	updateModelHandle.updateObject(this.attribute,newValue,newModelHandle, this.editorFactory);
			//}
			this.target.push(newValue);
			//this.emit("state-changed");
			//this.emit("value-changed");
		},
		postCreate: function () {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));
			//var validators = this.editorFactory.getModelValidators(this.attribute);
			//this.validator = new Validator({modelHandle:this.target, validators:validators});
			//var validateFn = this.editorFactory.createValidateFunction(this.validator);
			//this.on("value-changed", validateFn);	
		}
	});

});
