define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/dom-class",
"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./polymorphic_embedded_attribute.html",
		"dijit/layout/StackContainer", "dojo/Stateful",
		"gform/Editor","../group/_GroupMixin","dojox/mvc/equals", "../layout/_LayoutMixin"//
], function(array, lang, domClass, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, StackContainer, Stateful,
		Editor,_GroupMixin, equals, _LayoutMixin) {

	return declare([ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin, _LayoutMixin ], {
		templateString : template,
		typeStack:null,
		typeToGroup: null,
		nullable:true,
		shown: true,
		show: function() {
			if (!this.shown) {
				this.shown=true;
				this.typeStack.selectedChildWidget.show();
			}
		},
		postCreate: function() {

			var modelHandle = this.get("modelHandle");
			this.validTypeOptions = array.map(this.groups,
					function(validType) {
						return {
							value : validType.code,
							label : validType.label || validType.code
						};
					});
			if(this.nullable) {
				this.validTypeOptions.push({
					label : "null",
					value : "null"
				});
			}
			
			var currentType = modelHandle.currentTypeCode;
			
			this.panelModel = new Stateful({
				title : "",
				validTypes : this.validTypeOptions,
				type : currentType
			});

			this.typeStack = new StackContainer({doLayout:false});
			this.typeToGroup={};
			var me=this;
			var cloned = new Stateful({});
			//typeToValue[currentType].value=modelHandle.value;
			array.forEach(this.groups, function(group) {
				var editor = new Editor(
					{
						"modelHandle": modelHandle.getGroup(group.code),
						"meta":group,
						"editorFactory": this.editorFactory,
						"shown": group.code==currentType && this.shown
					});
				this.typeStack.addChild(editor);
				this.typeToGroup[group.code] = editor;
			}, this);

			this.modelHandle.watch("currentTypeCode", lang.hitch(this,"modelTypeChanged"));
			
			this.panelModel.watch("type",lang.hitch(this,"onTypeSelectorChanged"));
			//this.typeStack.selectChild(this.typeToGroup[currentType]);
			this.addChild(this.typeStack);
			this.set("target", this.panelModel);
			this.switchType(currentType);
		},
		modelTypeChanged: function(prop, old, nu) {
				if (old!=nu) {
					if (nu==null) nu="null";
					this.panelModel.set("type", nu);
				}
		},
		switchType: function(newType) {
					if (newType==null) {
 						domClass.replace(this.typeToGroup[this.modelHandle.currentTypeCode].domNode, "dijitHidden", "dijitVisible");
						this.modelHandle.set("currentTypeCode", null);
 					} else {
						var editor = this.typeToGroup[newType];
 						domClass.replace(editor.domNode, "dijitVisible", "dijitHidden");
						editor.show();	
						this.typeStack.selectChild(editor);
						this.modelHandle.set("currentTypeCode", newType);
					}
		},
		onTypeSelectorChanged: function(propName,oldValue,newValue) {
				if (oldValue!=newValue) {
					if (newValue="null") {
						newValue=null;
					}
					this.switchType(newValue);
				}
		},
		startup: function() {
			this.inherited(arguments);
			//if (this.modelHandle.value==null) {
			//	this.get("target").set("type","null");
			//}else{
			//	this.get("target").set("type", this.modelHandle.getCurrentTypeCode());
			//}
		}

	});

});
