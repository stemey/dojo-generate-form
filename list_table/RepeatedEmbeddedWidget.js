define([ "dojo/_base/lang", "dojo/_base/array", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dojo/Stateful", "../Editor",
		"dojo/text!./repeated_embedded_attribute.html", "dijit/form/TextBox", "./TableElementDecorator",
		"dijit/form/Button", "dijit/form/Select", "../copyProperties", "../mergeProperties", "../getStateful","./mergeAttributeDefinitions","dojo/dom-class"//
], function(lang, array, declare, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, Stateful, Editor,
		template, TextBox, TableElementDecorator, Button, Select, copyProperties, mergeProperties, getStateful,mergeAttributeDefinitions,domClass) {

	return declare("app.RepeatedEmbeddedWidget", [ _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin ],
			{
				templateString : template,
				postCreate : function() {
					var attribute = this.get("meta");
					var panelModel = new dojo.Stateful();
					panelModel.set("title", "");
					var me = this;
					var modelHandle = this.get("modelHandle");
					var editor;
					var model = modelHandle;

					if (this.meta.validTypes && this.meta.validTypes.length > 1) {
						var validTypeOptions = array.map(attribute.validTypes, function(validType) {
							return {
								value : validType.code,
								label : validType.label
							};
						});

						var currentType = modelHandle && modelHandle.value[attribute.type_property] ? modelHandle.value
								.get(attribute.type_property).value : validTypeOptions[0].value
						modelHandle.value[attribute.type_property] =getStateful(currentType);
								
								
						
						var typeToModel = {};
						var cloned = new Stateful({});
						copyProperties(modelHandle.value, cloned);
						typeToModel[currentType] = cloned;
						array.forEach(attribute.validTypes, function(type) {
							if (type.code != currentType) {
								typeToModel[type.code] = new Stateful();
								typeToModel[type.code][attribute.type_property] = getStateful(type.code);
								array.forEach(type.attributes, function(attribute) {
									typeToModel[type.code][attribute.code] = getStateful(null);
								});
							}
						}, this);

						var panelModel = new Stateful({
							title : "",// attribute.code,
							validTypes : this.validTypeOptions,
							type : currentType
						});

						var select = new Select({
							value : at(panelModel,"type"),
							options : validTypeOptions
						});
						var me =this;
						panelModel.watch("type", function(propName,oldValue,newValue) {
							var type = newValue;
							if (oldValue!=newValue) {	
								copyProperties(modelHandle.value,typeToModel[oldValue])
								mergeProperties(typeToModel[type],modelHandle.value );
								modelHandle.value[attribute.type_property].set("value",newValue);
								
							}
						});

						var decorator = new TableElementDecorator();
						decorator.addChild(select);
						this.addChild(decorator);

						var combinedAttributes=mergeAttributeDefinitions(this.meta.validTypes);
						
						array.forEach(combinedAttributes, function(attribute) {
							if (!modelHandle.value[attribute.code]) {
								modelHandle.value[attribute.code]=getStateful(null);
							}
							var tdWidget = this.editorFactory.attributeFactoryFinder.getFactory(attribute).create(
									attribute, modelHandle.value[attribute.code]);
							var decorator = new TableElementDecorator({meta:attribute});
							panelModel.watch("type", function(propName, oldValue, newValue) {
								decorator.updateTypeVisibilty(newValue);

							});
							decorator.addChild(tdWidget);
							decorator.updateTypeVisibilty(currentType);
							this.addChild(decorator);
						}, this);

						// editor = new
						// PolymorphicMemberWidget({"modelHandle":model,"meta":this.meta,nullable:false,editorFactory:this.editorFactory});
					} else {
						var meta = this.meta.validTypes ? this.meta.validTypes[0] : this.meta;
						// editor = new
						// Editor({"modelHandle":model,"meta":meta,editorFactory:this.editorFactory});
						array.forEach(this.meta.validTypes[0].attributes, function(attribute) {
							var tdWidget = this.editorFactory.attributeFactoryFinder.getFactory(attribute).create(
									attribute, modelHandle.value[attribute.code]);
							var decorator = new TableElementDecorator();
							decorator.addChild(tdWidget);
							this.addChild(decorator);
						}, this);
					}
					var decorator = new TableElementDecorator();
					var deleteButton = new Button({
						label : "delete"
					});
					decorator.addChild(deleteButton);
					this.addChild(decorator);
					// this.addChild(editor);
					this.set("target", panelModel);

					deleteButton.set("onClick", lang.hitch(this, "_delete"));
				},
				_delete : function(e) {
					var index = this.indexAtStartup;
					if (index >= 0) {
						this.parent.children.splice(index, 1);
					}
				}
				
			});

});
