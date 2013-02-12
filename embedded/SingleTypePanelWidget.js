define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./singletype_embedded_attribute.html",
		"dijit/layout/StackContainer", "dojo/Stateful","../getStateful", "../Editor","../group/_GroupMixin"
], function(array, lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, StackContainer, Stateful, getStateful,
		Editor, _GroupMixin) {

	return declare("app.SingleTypePanelWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin, _GroupMixin ], {
		
		templateString : template,
		
		postCreate : function() {
			var attribute = this.get("meta");
			this.panelModel = new dojo.Stateful();
			this.panelModel.set("empty", false);
			this.panelModel.set("title", "");
			
			this.get("modelHandle").saveModel = getStateful({});
			if (!this.get("modelHandle").value) {
				this.get("modelHandle").saveModel.value = new Stateful();
				this.panelModel.set("empty", true);
				this.containerNode.style.display = "none";
			} else {
				this.get("modelHandle").saveModel.value = this.get("modelHandle").value;
			}
			
			this.editor = new Editor({"modelHandle": this.get("modelHandle").saveModel, "meta": attribute.validTypes[0], editorFactory:this.editorFactory});
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
				modelHandle.saveModel.value=modelHandle.value;
				modelHandle.set("value", null);
				
				this.containerNode.style.display="none";
				this.validateAndFire();
			} else {
				modelHandle.set("value", modelHandle.saveModel.value);
				
				this.containerNode.style.display="";
				this.validateAndFire();
			}
		}	

	});

});
