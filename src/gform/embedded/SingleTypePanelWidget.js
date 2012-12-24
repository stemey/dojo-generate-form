define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./singletype_embedded_attribute.html",
		"dijit/layout/StackContainer", "dojo/Stateful",
		
		"dojox/mvc/Bind"//
], function(array, lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, StackContainer, Stateful,
		Bind) {

	return declare("app.GroupPanelWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		//_setMetaAttr : function(/* dojo/Stateful */attribute) {
		postCreate : function() {
			var attribute=this.get("meta");
			var panelModel = new dojo.Stateful();
			panelModel.set("empty", false);
			panelModel.set("title", "");
			var me=this;
			var modelHandle = this.get("modelHandle");
			if (modelHandle.get(attribute.code)) {
				var model = modelHandle.get(attribute.code);
			}else{
				var model = new Stateful();
				modelHandle.set(attribute.code,model);
			}
			
			editor = new app.Editor();
			editor.set("modelHandle", modelHandle);
			editor.set("meta", attribute);
			panelModel.watch("empty", function(e) {
				var modelHandle=me.get("modelHandle");
				if (panelModel.get("empty")) {
					modelHandle.set(attribute.code, null);
					editor.domNode.style.display="none";
				} else {
					editor.domNode.style.display="block";
					modelHandle.set(attribute.code, model);
				}
			});
			this.addChild(editor);
			this.set("target", panelModel);
		}

	});

});
