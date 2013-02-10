define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./singletype_embedded_attribute.html",
		"dijit/layout/StackContainer", "dojo/Stateful","../getStateful", "../Editor","../group/_GroupMixin"
], function(array, lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, StackContainer, Stateful,getStateful,
		Editor,_GroupMixin) {

	return declare("gform.SingleTypePanelWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin,_GroupMixin ], {
		templateString : template,
		//_setMetaAttr : function(/* dojo/Stateful */attribute) {
		postCreate : function() {
			var attribute=this.get("meta");
			this.panelModel = new dojo.Stateful();
			this.panelModel.set("empty", false);
			this.panelModel.set("title", "");
			var modelHandle = this.get("modelHandle");
			//modelHandle.saveModel=modelHandle.value
			modelHandle.watch("value",lang.hitch(this,"modelChanged"));
			
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
		modelChanged: function(propName,old,nu) {
			if (nu==null && old!=null) {
				this._switchedToNull();
				if (this.panelModel.get("empty")==false) {
					this.panelModel.set("empty",true);
				}
			}else if (old==null && nu!=null){
				if (this.panelModel.get("empty")==true) {
					this.panelModel.set("empty",false);
				}
			}		
		},
		_switchedToNull: function() {
					this.containerNode.style.display="none";
					this.validateAndFire();
		},
		switchedNull: function(propName,old,nu) {
				if (old==nu) {
					return;
				}
				var modelHandle=this.get("modelHandle");
				if (this.panelModel.get("empty")) {
					if (modelHandle.value!=null) {
						modelHandle.nonNullValue=modelHandle.value;
						modelHandle.set("value", null);
					}
				} else {
					this.containerNode.style.display="";
					if (modelHandle.value==null) {
						modelHandle.set("value", modelHandle.nonNullValue);
					}
					this.validateAndFire();
				}
		}	

	});

});
