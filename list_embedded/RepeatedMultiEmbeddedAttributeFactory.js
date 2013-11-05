define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/aspect",//
"../Editor",//
"dojo/_base/declare",//
"dojox/mvc/at",//
"dojox/mvc/StatefulArray",//
"dojo/Stateful",//
"./EmbeddedListWidget",//
"dojox/mvc/sync",//
"../widget/MvcDndSource",//
"../layout/LayoutWidgetList",//
"./RepeatedEmbeddedWidget",//
"../model/updateModelHandle",//
"../model/getPlainValue",//
"../model/ArrayModel",//
"../layout/_LayoutMixin"
], function(array, lang, aspect, Editor, declare, at, 
		StatefulArray, Stateful,EmbeddedListWidget, sync, DndSource, WidgetList, RepeatedEmbeddedWidget, updateModelHandle, getPlainValue, ArrayModel, _LayoutMixin) {

	var findGroup = function(code, allGroups) {
			var groups = allGroups.filter(function(group) {
				return group.code==code;
			});
			return groups[0];
	}

	return declare([], {

		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
		},
		handles : function(attribute) {
			return attribute != null && attribute.type == "multi-array";
		},
		create : function(attribute, modelHandle) {

			var childMeta = attribute.groups[0]

			var select = new EmbeddedListWidget({
				target : modelHandle,
				group:childMeta,
				typeProperty: attribute.typeProperty,
				editorFactory: this.editorFactory
			});


			var widgetList = new WidgetList();
			widgetList.set("partialRebuild", true);
			widgetList.set("children", modelHandle.value);
			widgetList.set("childClz", RepeatedEmbeddedWidget);
			widgetList.set("childParams", {
				groups : attribute.groups,
				typeProperty:attribute.typeProperty,
				_relTargetProp : "modelHandle",
				editorFactory: this.editorFactory
			});
			select.addChild(widgetList);
			

			
			if (attribute.reorderable!==false) {
				var me = this;
				var copy = function(original) {
					var plainValue= original.getPlainValue();
					var type = plainValue[attribute.typePropery];
					var newMh=me.editorFactory.createGroupModel(findGroup(type, attribute.groups));
					newMh.update(plainValue);
					newMh.oldValue=plainValue;
					return newMh;
				}
				//var copyFn=lang.hitch(this,copy);
				aspect.after(widgetList, "startup", function() {
					new DndSource(widgetList.domNode, {copyFn: copy, copyOnly:false, singular:true, withHandles: true});
				});
			}


			return select;

		},
		createModel: function(meta,plainValue) {
			var model = new ArrayModel();
			var me = this;
			var ef = function(value) {
				var group = findGroup(value[meta.typeProperty], meta.groups);	
				var model = me.editorFactory.createGroupModel(group);
				if (value) {
					model.update(value);
				}
				return model;
			}
			model.elementFactory = ef;
			model.update(plainValue);
			return model;
		},
/* getSchema() is implemented in gform/embedded/EmbeddedAttributeFactory */
	})
});
