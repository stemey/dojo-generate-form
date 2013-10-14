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

	return declare("app.GroupPanelWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin,_GroupMixin, _LayoutMixin ], {
		templateString : template,
		typeStack:null,
		nullable:true,
		shown: true,
		show: function() {
			if (!this.shown) {
				this.shown=true;
				this.typeStack.selectedChildWidget.show();
			}
		},
		postCreate: function() {
			var attribute=this.get("meta");
			var validTypes = attribute.validTypes;

			var modelHandle = this.get("modelHandle");
			this.validTypeOptions = array.map(attribute.validTypes,
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
			var attributeData=modelHandle.value;

			var currentType = attributeData && attributeData[attribute.type_property] ? attributeData[attribute.type_property].value : "null";
			
			this.panelModel = new Stateful({
				title : "",
				validTypes : this.validTypeOptions,
				type : currentType
			});

			this.typeStack = new StackContainer({doLayout:false});
			this.typeToGroup = {};
			var me=this;
			var typeToValue=this.modelHandle.typeToValue;
			var cloned = new Stateful({});
			//typeToValue[currentType].value=modelHandle.value;
			array.forEach(attribute.validTypes, function(type) {
				var editor = new Editor(
					{
						"modelHandle": typeToValue[type.code],
						"meta":type,editorFactory:this.editorFactory,
						"shown": type==currentType && this.shown
					});
				this.typeStack.addChild(editor);
				this.typeToGroup[type.code] = editor;
			}, this);

			this.modelHandle.watch("value",lang.hitch(this,"modelChanged"));
			
			this.panelModel.watch("type",lang.hitch(this,"switchType"));
			//this.typeStack.selectChild(this.typeToGroup[currentType]);
			this.addChild(this.typeStack);
			this.set("target", this.panelModel);
		},
		modelChanged: function() {
			if (this.modelHandle.value==null && this.panelModel.get("type")!="null") {
				this.panelModel.set("type","null");
			}else if (this.modelHandle.value!=null && this.panelModel.get("type")!=this.modelHandle.value[this.meta.type_property].value) {
				this.panelModel.set("type",this.modelHandle.value[this.meta.type_property].value);
			}
		},
		getChildrenToValidate: function() {
			if (this.modelHandle.value==null) {
				return [];
			}else if (this.typeStack.selectedChildWidget){
				return [this.typeStack.selectedChildWidget];
			} else{
				return[];
			}	
		},
		switchType: function(propName,oldValue,newValue) {
				var type = newValue;
				var modelHandle=this.get("modelHandle");
				if (type == "null") {
					modelHandle.set("value", null);
					// rather clear all properites
					this.typeStack.domNode.style.display="none";
					this.validateAndFire();
				} else {
					this.typeStack.domNode.style.display="";
					if (oldValue!=newValue) {	
						if (modelHandle.get("value")==null) {
							modelHandle.value=this.modelHandle.typeToValue[type].value;
						}else{
							var oldModelHandleValue=modelHandle.value;	
							modelHandle.value=this.modelHandle.typeToValue[type].value;
							if (oldValue!="null") {
								var oldMeta = this.typeToGroup[oldValue].meta;
								var newMeta = this.typeToGroup[newValue].meta;
								array.forEach(oldMeta.attributes,function(attribute) {
									//only copy primitives
									if (!attribute.validTypes && typeof modelHandle.value[attribute.code]!= "undefined") {
										var attributeExists = array.some(newMeta.attributes,function(newAttribute) {return equals(newAttribute,attribute);});
										if (attributeExists) {
											modelHandle.value[attribute.code].set("value",oldModelHandleValue[attribute.code].value);
										}
									}
								},this);
							}
						}
					}
					this.typeStack.selectChild(this.typeToGroup[type]);
					if (this.shown) this.typeToGroup[type].show();
					if (domClass.contains(this.typeToGroup[type].domNode,"dijitHidden")) {
						// there is an issue with initial visibility
						domClass.replace(this.typeToGroup[type].domNode, "dijitVisible", "dijitHidden");
					}
					this.validateAndFire();
				}			
		},
		startup: function() {
			this.inherited(arguments);
			if (this.modelHandle.value==null) {
				this.get("target").set("type","null");
			}else{
				this.get("target").set("type", this.modelHandle.value[this.meta.type_property].value);
			}
		}

	});

});
