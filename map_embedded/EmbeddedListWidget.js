define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		"dijit/_Container", "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dojo/text!../list_embedded/embedded_list_attribute.html", "../model/updateModelHandle",//
		"dojo/i18n!../nls/messages", "../layout/_LayoutMixin", "../model/Validator", "../group/_GroupMixin"
], function(lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, updateModelHandle, messages, _LayoutMixin, Validator, _GroupMixin) {

	return declare([ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin, _LayoutMixin , _GroupMixin], {
		templateString : template,
		messages:messages,
		updateMethod: null,
		_addElement : function() {
			var newModelHandle = updateModelHandle.createMeta();
			var type=this.attribute.validTypes[0].code;
			var type_property=this.attribute.type_property;
			var newValue={};
			newValue[type_property]=type;

			updateModelHandle.cascadeAttribute(this.attribute,newValue,newModelHandle, this.editorFactory);

			this.target.value.push(newModelHandle);
			this.emit("state-changed");
		},
		postCreate : function() {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));

			this.validator = this.editorFactory.getModelValidators(this.attribute, this.target);
			var validateFn = this.editorFactory.createValidateFunction(this.validator);

			
			var validators = this.editorFactory.getModelValidators(this.attribute);
			this.validator = new Validator({modelHandle:this.target, validators:validators});
			var validateFn = this.editorFactory.createValidateFunction(this.validator);
			this.on("value-changed", validateFn);	
			
			var validateFn=null;
			var validator=this.validator;
			if (this.editorFactory.asyncModelValidation) {
				validateFn = function() {
					setTimeout( function(){
						validator.validate();
					}, 0);
				};
			} else {
				validateFn = function() {
					validator.validate();
				};
			}
			this.on("value-changed", validateFn);	

		},
		validateModel: function() {
			if (this.validator) {
					return this.validator.validate();
			}
		}
	});

});
