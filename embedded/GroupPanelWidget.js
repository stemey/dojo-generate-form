define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./polymorphic_embedded_attribute.html",
		"dijit/layout/StackContainer", "dojo/Stateful",
		"gform/Editor","../getStateful","../copyProperties","../mergeProperties"//
], function(array, lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, StackContainer, Stateful,
		Editor,getStateful,copyProperties,mergeProperties) {

	return declare("app.GroupPanelWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		typeStack:null,
		nullable:true,
		postCreate: function() {
			if (this.meta) {
				this._buildContained();
			}else{
				this.watch("meta", lang.hitch(this, "_buildContained"));
			}
		},
		_buildContained : function() {
			var attribute=this.get("meta");
			// move this to postCreate
			var validTypes = attribute.validTypes;

			var modelHandle = this.get("modelHandle");
			this.validTypeOptions = array.map(attribute.validTypes,
					function(validType) {
						return {
							value : validType.code,
							label : validType.label
						};
					});
			if(this.nullable) {
				this.validTypeOptions.push({
					label : "null",
					value : "null"
				});
			}
			var attributeData=modelHandle[attribute.code];

			var currentType = attributeData ? attributeData[attribute.type_property].value:"null";
			
			var panelModel = new Stateful({
				title : "",// attribute.code,
				validTypes : this.validTypeOptions,
				type : currentType
			});

			this.typeStack = new StackContainer({doLayout:false});
			this.typeToGroup = {};
			var me=this;
			var typeToModel={};
			var cloned = new Stateful({});
			copyProperties(modelHandle.get(attribute.code),cloned);
			typeToModel[currentType]=cloned;	
			array.forEach(attribute.validTypes, function(type) {
				if (type.code!=currentType) {	
					typeToModel[type.code]=getStateful({});
					typeToModel[type.code][attribute.type_property]=getStateful(type.code);
					array.forEach(type.attributes,function(attribute) {
						typeToModel[type.code][attribute.code]=null;
					});
				}
				var editor = new Editor(
					{
						"modelHandle": modelHandle[attribute.code],
						"meta":type,editorFactory:this.editorFactory
					});
				this.typeStack.addChild(editor);
				this.typeToGroup[type.code] = editor;
			}, this);
			
			panelModel.watch("type", function(propName,oldValue,newValue) {
				var type = newValue;
				var modelHandle=me.get("modelHandle");
				if (type == "null") {
					modelHandle.set(attribute.code, null);
					// rather clear all properites
					me.typeStack.domNode.style.display="none";
				} else {
					me.typeStack.domNode.style.display="block";
					if (oldValue!=newValue) {	
						if (modelHandle.get(attribute.code)==null) {
							var cloned = new Stateful({});
							copyProperties(modelHandle.get(attribute.code),cloned);
							modelHandle[attribute.code]=cloned;
						}else{
							copyProperties(modelHandle.get(attribute.code),typeToModel[oldValue])
							mergeProperties(typeToModel[type],modelHandle.get(attribute.code) );
							modelHandle[attribute.code][attribute.type_property]=getStateful(newValue);
						}
					}
					me.typeStack.selectChild(me.typeToGroup[type]);
				}
			});
			this.addChild(this.typeStack);
			this.set("target", panelModel);
		},
		startup: function() {
			this.inherited(arguments);
			this.get("target").set("type", this.modelHandle[this.meta.code][this.meta.type_property].value);
		}

	});

});
