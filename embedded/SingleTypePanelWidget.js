define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./singletype_embedded_attribute.html", "dojo/text!./singletype_embedded_required_attribute.html",
		"dijit/layout/StackContainer", "dojo/Stateful","../model/updateModelHandle", "../Editor","../group/_GroupMixin",
"../layout/_LayoutMixin"
], function(array, lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, requiredTemplate, StackContainer, Stateful,updateModelHandle,
		Editor,_GroupMixin,_LayoutMixin) {

	return declare("gform.SingleTypePanelWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin,_GroupMixin, _LayoutMixin ], {

		templateString : null,
		constructor : function(config) {
			var attribute = config.meta;
			if (attribute.required) {
				this.templateString=requiredTemplate;
			} else{
				this.templateString=template;
			}
			this.inherited(arguments);
		},
		postCreate : function() {
			var modelHandle = this.get("modelHandle");
			var attribute = this.get("meta");
				this.panelModel = new dojo.Stateful();
			this.panelModel.watch("empty", lang.hitch(this,"panelChanged"));
			this.panelModel.set("empty", modelHandle.value==null);
			this.panelModel.set("title", "");
			modelHandle.watch("value",lang.hitch(this,"modelChanged"));
			
			// is not contained in layout container  so should take as much space as necessary -> doLayout=false
			this.editor = new Editor({doLayout:false,"modelHandle": modelHandle.nonNullValue,"meta": attribute.validTypes[0],editorFactory:this.editorFactory});
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
		_switchedFromNull: function() {
					this.containerNode.style.display="initial";
		},
		panelChanged: function(propName,old,nu) {
				if (old==nu) {
					return;
				}
				var modelHandle=this.get("modelHandle");
				if (this.panelModel.get("empty")) {
					this._switchedToNull();
					if (modelHandle.value!=null) {
						modelHandle.set("value",null);
					}
				} else {
					this._switchedFromNull();
					if (modelHandle.value==null) {
						modelHandle.set("value",modelHandle.nonNullValue.value);
					}
					this.validateAndFire();
				}
		}	

	});

});
