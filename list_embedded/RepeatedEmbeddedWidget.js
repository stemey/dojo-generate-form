define([ "dojo/_base/lang", "dojo/dom-class",  "dojo/_base/array", "dojo/_base/declare",
		"dijit/_WidgetBase", "dijit/_Container", "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin","dojo/Stateful", "./PolymorphicMemberWidget","../Editor",
		"dojo/text!./repeated_embedded_attribute.html", "dijit/TitlePane", "dojo/i18n!../nls/messages",
		"../layout/_LayoutMixin","../schema/labelHelper"
], function(lang, domClass, array, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, Stateful,  PolymorphicMemberWidget,Editor,template, TitlePane, messages, _LayoutMixin, labelHelper) {

	return declare("app.RepeatedEmbeddedWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin, _LayoutMixin ], {
		templateString : template,
		messages: messages,
		_setModelHandleAttr: function(value) {
			this._set("modelHandle",value);
		},	
		postCreate : function() {
			var panelModel = new dojo.Stateful();
			panelModel.set("title", "");
			var me=this;
			var modelHandle = this.get("modelHandle");
			if (this.groups) {
				this.editor = new PolymorphicMemberWidget({"shown":false, "modelHandle": modelHandle, "groups": this.groups, nullable: false, editorFactory: this.editorFactory});
			}else{
				this.editor = new Editor({"shown":false, "modelHandle":modelHandle, "meta":this.group,editorFactory:this.editorFactory});
			}
		  //var titlePane = new TitlePane({title:at(modelHandle,"index")});
			//titlePane.addChild(editor);
			this.addChild(this.editor);
			this.set("target", panelModel);
			domClass.add(this.titlePane.titleBarNode, "dojoDndHandle");
			
			modelHandle.watch("index", lang.hitch(this, "indexChanged"));
			this.on("value-changed", lang.hitch(this, "titleChanged"));
			this.titlePane.watch("open", lang.hitch(this, "titlePaneToggled"));
			this.titlePane.set("open", false);

			this.deleteButton.set("onClick", lang.hitch(this, "_delete"));
			this.titleChanged();
		},
		titlePaneToggled: function() {
			if (this.titlePane.open) {
				this.getChildren()[0].show();
			}
		},
		indexChanged: function(propName, old, nu) {
			this.titleChanged();
		},
		titleChanged: function() {
				
			var title = this.modelHandle.index+1+". ";
			// todo fix this.group[0]
			var label = labelHelper.getLabel(this.group || this.groups[0], this.modelHandle);
			title+=label==null?"":label;
			if (this.titlePane) {this.titlePane.set("title",title);} 
		},
		_delete : function(e) {
			var eventDispatcher = this.getParent();
			var index = this.getParent().getChildren().indexOf(this);
			if (index >= 0) {
				this.parent.children.splice(index, 1);
			}
			//eventDispatcher.emit("state-changed");
			//eventDispatcher.emit("value-changed");
		},
		destroy: function() {
			array.forEach(this.getChildren(),function(child) {
				child.destroy();
				//this.removeChild(child);
			});
			this.inherited(arguments);
		//	this.destroyRecursive();
		}

	});

});
