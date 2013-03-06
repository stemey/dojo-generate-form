define([ "dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase",
		"dijit/_Container", "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin",
		"dojo/text!./embedded_list_attribute.html", "../updateModelHandle"//
], function(lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, updateModelHandle) {

	return declare("gform.EmbeddedListWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		_addElement : function() {
			var newModelHandle = updateModelHandle.createMeta();
			var type=this.attribute.validTypes[0].code;
			var type_property=this.attribute.type_property;
			var newValue={};
			newValue[type_property]=type;
			if (this.attribute.validTypes.length>1) {
				updateModelHandle.updatePolyObject(this.attribute,newValue,newModelHandle);
			}else{
				updateModelHandle.updateObject(this.attribute,newValue,newModelHandle);
			}
			this.target.value.push(newModelHandle);
			this.emit("valid-changed");
			this.emit("value-changed");
		},
		postCreate : function() {
			this.addButton.set("onClick", lang.hitch(this, "_addElement"));
		}
	});

});
