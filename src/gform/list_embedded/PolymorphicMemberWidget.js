define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin",
		"dojo/text!./polymorphic_embedded_attribute.html",
		"dijit/layout/StackContainer", "dojo/Stateful",
		"gform/Editor"//
], function(array, lang, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, template, StackContainer, Stateful,
		Editor) {

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
			if(this.nullable) {
				this.validTypeOptions.push({
					label : "null",
					value : "null"
				});
			}
			var currentType = modelHandle && modelHandle[attribute.type_property]? modelHandle.get(attribute.type_property) : this.validTypeOptions[0].value
			modelHandle[attribute.type_property]=currentType;
			var panelModel = new Stateful({
				title : "",// attribute.code,
				validTypes : this.validTypeOptions,
				type : currentType
			});

			this.typeStack = new StackContainer();
			this.typeToGroup = {};
			var me=this;
			var typeToModel={};
			typeToModel[currentType]=modelHandle;	
			array.forEach(attribute.validTypes, function(type) {
				if (type.code!=currentType) {	
					typeToModel[type.code]=new Stateful();
					typeToModel[type.code][attribute.type_property]=type.code;
				}
				var editor = new Editor(
					{
						"modelHandle": typeToModel[type.code],
						"meta":type,
						editorFactory:this.editorFactory
					});
				this.typeStack.addChild(editor);
				this.typeToGroup[type.code] = editor;
			}, this);
			
			panelModel.watch("type", function() {
				var type = panelModel.get("type");
				var modelHandle=me.get("modelHandle");
				modelHandle.set(attribute.code, typeToModel[type]);
				me.typeStack.selectChild(me.typeToGroup[type]);
			});
			this.addChild(this.typeStack);
			this.set("target", panelModel);
		},
		startup: function() {
			this.inherited(arguments);
			this.get("target").set("type", this.modelHandle.get(this.meta.type_property));
		}

	});

});
