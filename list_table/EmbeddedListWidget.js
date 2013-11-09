define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		"dijit/_Container", "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dojo/text!./embedded_list_attribute.html", "../model/updateModelHandle", "dojo/i18n!../nls/messages", "../model/Validator", "../group/_GroupMixin"//
], function(lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, updateModelHandle, messages, Validator, _GroupMixin) {

	return declare([ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin, _GroupMixin ], {
		templateString : template,
		messages:messages,
		attribute:null,
		_addElement : function() {
			
			var value = {};
			value[this.attribute.typeProperty]=	this.attribute.groups[0].code;
			this.target.push(value);	
			//sthis.emit("state-changed");
		},
		postCreate : function() {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));
			//var validators = this.editorFactory.getModelValidators(this.attribute);
			//this.validator = new Validator({modelHandle:this.target, validators:validators});
			//var validateFn = this.editorFactory.createValidateFunction(this.validator);
			//this.on("value-changed", validateFn);	

		}
	});

});
