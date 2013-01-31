define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./singletype_embedded_attribute.html",
		"dijit/layout/StackContainer", "dojo/Stateful","../getStateful", "../Editor","../group/_GroupMixin"
], function(array, lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, StackContainer, Stateful,getStateful,
		Editor,_GroupMixin) {

	return declare("app.SingleTypePanelWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin,_GroupMixin ], {
		templateString : template,
		//_setMetaAttr : function(/* dojo/Stateful */attribute) {
		postCreate : function() {
			var attribute=this.get("meta");
			this.panelModel = new dojo.Stateful();
			this.panelModel.set("empty", false);
			this.panelModel.set("title", "");
			var modelHandle = this.get("modelHandle");
			modelHandle.saveModel=modelHandle.value
			
			this.editor = new Editor({"modelHandle": modelHandle,"meta": attribute.validTypes[0],editorFactory:this.editorFactory});
			this.panelModel.watch("empty", lang.hitch(this,"switchedNull"));
			this.addChild(this.editor);
			this.set("target", this.panelModel);
		},
		getChildrenToValidate:function() {
			if (this.panelModel.get("empty")) {
				return [];
			}else{
				return this.inherited(arguments);
			}
		}, 
		switchedNull: function() {
				var modelHandle=this.get("modelHandle");
				if (this.panelModel.get("empty")) {
					modelHandle.savedValue=modelHandle.value;
					modelHandle.set("value", null);
					this.containerNode.style.display="none";
					this.validateAndFire();
				} else {
					this.containerNode.style.display="";
					modelHandle.set("value", modelHandle.savedValue);
					this.validateAndFire();
				}
		}	

	});

});
