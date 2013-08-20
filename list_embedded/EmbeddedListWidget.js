define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		"dijit/_Container", "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dojo/text!./embedded_list_attribute.html", "../model/updateModelHandle",//
		"dojo/i18n!../nls/messages", "../layout/_LayoutMixin", "../group/_GroupMixin", "../model/Validator"
], function(lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, updateModelHandle, messages, _LayoutMixin, _GroupMixin, Validator) {

	return declare("...EmbeddedListWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin, _LayoutMixin, _GroupMixin ], {
		templateString : template,
		messages:messages,
		_addElement : function() {
			var newModelHandle = updateModelHandle.createMeta(this.target);
			var type=this.attribute.validTypes[0].code;
			var type_property=this.attribute.type_property;
			var newValue={};
			newValue[type_property]=type;

			if (this.attribute.validTypes.length>1) {
				updateModelHandle.updatePolyObject(this.attribute,newValue,newModelHandle, this.editorFactory);
			}else{
				updateModelHandle.updateObject(this.attribute,newValue,newModelHandle, this.editorFactory);
			}
			this.target.value.push(newModelHandle);
			this.emit("state-changed");
			this.emit("value-changed");
		},
		postCreate : function() {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));
			var validators = this.editorFactory.getModelValidators(this.attribute);
			this.validator = new Validator({modelHandle:this.target, validators:validators});
			var validateFn = this.editorFactory.createValidateFunction(this.validator);
			this.on("value-changed", validateFn);	
		}
	});

});
