define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./polymorphic_embedded_attribute.html",
		"dijit/layout/StackContainer", "dojo/Stateful","../getStateful",
		"gform/Editor","../copyProperties","../mergeProperties"//
], function(array, lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, StackContainer, Stateful,
		getStateful,Editor,copyProperties,mergeProperties) {

	return declare("app.PolymorphicMemberWidget", [ _WidgetBase, _Container,
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
			var currentType = modelHandle && modelHandle[attribute.type_property]? modelHandle.get(attribute.type_property).value : this.validTypeOptions[0].value
			modelHandle[attribute.type_property]=getStateful(currentType);
			var panelModel = new Stateful({
				title : "",// attribute.code,
				validTypes : this.validTypeOptions,
				type : currentType
			});

			this.typeStack = new StackContainer();
			this.typeToGroup = {};
			var me=this;
			var typeToModel={};
			var cloned = new Stateful({});
			copyProperties(modelHandle,cloned);
			typeToModel[currentType]=cloned;	
			array.forEach(attribute.validTypes, function(type) {
				if (type.code!=currentType) {	
					typeToModel[type.code]=new Stateful();
					typeToModel[type.code][attribute.type_property]=getStateful(type.code);
					array.forEach(type.attributes,function(attribute) {
						typeToModel[type.code][attribute.code]=null;
					});
				}
				var editor = new Editor(
					{
						"modelHandle": modelHandle,
						"meta":type,
						editorFactory:this.editorFactory
					});
				this.typeStack.addChild(editor);
				this.typeToGroup[type.code] = editor;
			}, this);
			
			panelModel.watch("type", function(propName,oldValue,newValue) {
				var type = newValue;
				var modelHandle=me.get("modelHandle");
				if (oldValue!=newValue) {	
					copyProperties(modelHandle,typeToModel[oldValue])
					mergeProperties(typeToModel[type],modelHandle );
					modelHandle[attribute.type_property]=getStateful(newValue);
				}
				me.typeStack.selectChild(me.typeToGroup[type]);
			});
			this.addChild(this.typeStack);
			this.set("target", panelModel);
		},
		startup: function() {
			this.inherited(arguments);
			this.get("target").set("type", this.modelHandle.get(this.meta.type_property).value);
		}

	});

});
