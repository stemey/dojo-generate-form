define([ "dojo/_base/lang", "dojo/_base/array", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
		"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dojo/Stateful", "../Editor",
		"dojo/text!./repeated_embedded_attribute.html", "dijit/form/TextBox", "./TableElementDecorator", "./TableValueDecorator",
		"dijit/form/Button", "dijit/form/Select", "../updateModelHandle","./mergeAttributeDefinitions","dojo/dom-class", "dojo/i18n!../nls/messages"//
], function(lang, array, declare, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, Stateful, Editor,
		template, TextBox, TableElementDecorator,TableValueDecorator, Button, Select,  updateModelHandle,mergeAttributeDefinitions,domClass, messages) {

	return declare("app.RepeatedEmbeddedWidget", [ _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin ],
			{
				templateString : template,
				postCreate : function() {

					if (this.meta.validTypes && this.meta.validTypes.length > 1) {

						var currentType = this.modelHandle && this.modelHandle.value[this.meta.type_property] ? this.modelHandle.value
								.get(this.meta.type_property).value : this.meta.validTypes[0].code

						var select=this._createTypeSelect(currentType);
								
						select.watch("value", lang.hitch(this,"switchedType"));
						
						this._createTableRow(select,currentType);

					} else {
						var meta = this.meta.validTypes ? this.meta.validTypes[0] : this.meta;
						array.forEach(meta.attributes, function(attribute) {
							if (!this.modelHandle.value[attribute.code]) {
								throw new Error(" attribute "+attribute.code+" was not initialiaized");
							}
							var attributeModelHandle=this.modelHandle.value[attribute.code];
							var tdWidget = this.editorFactory.attributeFactoryFinder.getFactory(attribute).create(
									attribute, attributeModelHandle);
							var decorator = new TableValueDecorator({meta:attribute,modelHandle:attributeModelHandle});
							decorator.addChild(tdWidget);
							this.addChild(decorator);
						}, this);
					}
					var decorator = new TableElementDecorator();
					var deleteButton = new Button({
						label : messages["removeButtonLabel"], 
						showLabel:false,
						iconClass:"dijitIconDelete"
					});
					decorator.addChild(deleteButton);
					this.addChild(decorator);

					deleteButton.set("onClick", lang.hitch(this, "_delete"));
				},
				_delete : function(e) {
					var eventDispatcher = this.getParent();
					var index = this.getParent().getChildren().indexOf(this);
					if (index >= 0) {
						this.parent.children.splice(index, 1);
					}
					eventDispatcher.emit("valid-changed");
				},
				switchedType:	function(propName,oldType,newType) {
						if (oldType!=newType) {	
							updateModelHandle.switchTypeInMergedObject(this.meta,newType,this.modelHandle);
						}
				},
				_createTypeSelect: function(currentType) {
						var validTypeOptions = array.map(this.meta.validTypes, function(validType) {
							return {
								value : validType.code,
								label : validType.label
							};
						});
						var panelModel= new Stateful({
							title : "",
							validTypes : validTypeOptions,
							type : currentType
						});
						var select = new Select({
							value : at(panelModel,"type"),
							options : validTypeOptions
						});
						this.set("target", panelModel);
						return select;

				},
				_createTableRow:		function(select,currentType) {
						var decorator = new TableElementDecorator();
						decorator.addChild(select);
						this.addChild(decorator);

						var combinedAttributes=this.combinedAttributes;
						
						array.forEach(combinedAttributes, function(attribute) {
							var attributeModelHandle=this.modelHandle.value[attribute.code];
							var tdWidget = this.editorFactory.attributeFactoryFinder.getFactory(attribute).create(
									attribute, attributeModelHandle);
							var decorator = new TableValueDecorator({meta:attribute,modelHandle:attributeModelHandle});
							select.watch("value", function(propName, oldValue, newValue) {
								decorator.updateTypeVisibilty(newValue);
							});
							decorator.addChild(tdWidget);
							decorator.updateTypeVisibilty(currentType);
							this.addChild(decorator);
						}, this);

				}
			});

});
