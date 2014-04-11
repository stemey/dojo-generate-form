define([ 'dojox/mvc/at',
	"dojo/_base/lang", "dojo/_base/array", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container",
	"dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "../model/ArrayModel", "../Editor",
	"dojo/text!./repeated_embedded_attribute.html", "dijit/form/TextBox", "./TableElementDecorator", "./TableValueDecorator", "../widget/DndIndicator",
	"dijit/form/Button", "dijit/form/Select", "../model/MergedMultiObject", "./mergeAttributeDefinitions", "dojo/dom-class", "dojo/i18n!../nls/messages", "dojo/Stateful"//
], function (at, lang, array, declare, _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin, ArrayModel, Editor, template, TextBox, TableElementDecorator, TableValueDecorator, DndIndicator, Button, Select, MergedMultiObject, mergeAttributeDefinitions, domClass, messages, Stateful) {

	return declare([ _WidgetBase, _Container, _TemplatedMixin, _WidgetsInTemplateMixin ],
		{
			templateString: template,
			postCreate: function () {

				if (this.meta.groups && this.meta.groups.length > 1) {

					var currentType = this.modelHandle.get("currentTypeCode");

					var select = this._createTypeSelect(currentType);

					select.watch("value", lang.hitch(this, "switchedType"));

					this._createTableRow(select, currentType);

				} else {
					var meta = this.meta.groups ? this.meta.groups[0] : this.meta;
					array.forEach(meta.attributes, function (attribute) {

						var attributeModelHandle = this.modelHandle.getModelByKey(attribute.code);
						var tdWidget = this.editorFactory.attributeFactoryFinder.getFactory(attribute).create(
							attribute, attributeModelHandle, this.ctx);
						var decorator = new TableValueDecorator({meta: attribute, modelHandle: attributeModelHandle});
						decorator.addChild(tdWidget);
						this.addChild(decorator);
					}, this);
				}
				var decorator = new TableElementDecorator();
				var deleteButton = new Button({
					label: messages.removeButtonLabel,
					showLabel: false,
					iconClass: "dijitIconDelete"
				});
				decorator.addChild(deleteButton);
				this.addChild(decorator);
				if (this.meta.reorderable !== false) {
					var dndDecorator = new TableElementDecorator();
					dndDecorator.addChild(new DndIndicator());
					this.addChild(dndDecorator);
				}

				deleteButton.set("onClick", lang.hitch(this, "_delete"));
			},
			_delete: function (e) {
				this.modelHandle.remove();
			},
			switchedType: function (propName, oldType, newType) {
				if (oldType !== newType) {
					this.modelHandle.set("currentTypeCode", newType);
				}
			},
			_createTypeSelect: function (currentType) {
				var validTypeOptions = array.map(this.meta.groups, function (group) {
					return {
						value: group.code,
						label: group.label
					};
				});
				var panelModel = new Stateful({
					title: "",
					validTypes: validTypeOptions,
					type: currentType
				});
				var select = new Select({
					value: at(panelModel, "type"),
					options: validTypeOptions
				});
				this.set("target", panelModel);
				return select;

			},
			_createTableRow: function (select, currentType) {
				var decorator = new TableElementDecorator();
				decorator.addChild(select);
				this.addChild(decorator);

				var combinedAttributes = this.combinedAttributes;

				array.forEach(combinedAttributes, function (attribute) {
					var attributeModelHandle = this.modelHandle.getModelByKey(attribute.code);
					var tdWidget = this.editorFactory.attributeFactoryFinder.getFactory(attribute).create(
						attribute, attributeModelHandle);
					var decorator = new TableValueDecorator({meta: attribute, modelHandle: attributeModelHandle});
					select.watch("value", function (propName, oldValue, newValue) {
						decorator.updateTypeVisibilty(newValue);
					});
					decorator.addChild(tdWidget);
					decorator.updateTypeVisibilty(currentType);
					this.addChild(decorator);
				}, this);

			}
		});

});
