define([
	'dojo/topic',
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/_base/declare",
	"../model/MultiGroup",
	"dijit/layout/TabContainer"

], function (topic, lang, aspect, declare, MultiGroup, TabContainer) {

	return declare([], {
		id: "tab",
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		createModel: function (meta, plainValue) {
			var groups = [];
			var validators = this.editorFactory.getModelValidators(meta);
			meta.groups.forEach(function (group) {
				groups.push(this.editorFactory.createGroupModel(group));
			}, this);
			var model = new MultiGroup({
				validators: validators,
				schema: meta,
				groups: groups,
				required: meta.required === true
			});
			model.update(plainValue,true,false);
			return model;
		},
		createAttribute: function (attribute, modelHandle) {
			var factory = this.editorFactory.attributeFactoryFinder
				.getFactory(attribute.editor);
			return factory.create(attribute, modelHandle);
		},
		create: function (group, modelHandle, ctx) {
			var tc = new TabContainer({
				doLayout: true,
				style: "height: 100%; width: 100%;"
			});
			for (var index = 0; index < group.groups.length; index++) {
				var tab = group.groups[index];
				if (!tab.groupType) {
					tab.groupType = "listpane";
				}
				var model = modelHandle.getModelByIndex(index);
				var tabWidget = this.editorFactory.create(tab, model, ctx, {hidden:true});
				tabWidget.set("title", tab.label);
				tabWidget.set("meta", tab);
				tc.addChild(tabWidget);
				tabWidget.own(topic.subscribe(tc.id + "-selectChild", function (page) {
					if (page && page.show) {
						page.show();
					}
				}));

				tabWidget.own(aspect.after(modelHandle.getModelByIndex(index), "onChange", lang.hitch(this, "onValidChanged", tabWidget, model, tab.label)));
			}

			tc.selectChild(tc.getChildren()[0]);
			return tc;
		},
		onValidChanged: function (tabWidget, model, label) {
			var badge = this.editorFactory.createBadge(model);
			tabWidget.set("title", label + badge);
		}

	});
});
