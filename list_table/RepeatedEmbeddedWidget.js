define([ "dojo/_base/lang", "dojo/_base/array", "dojo/_base/declare",
		"dijit/_WidgetBase", "dijit/_Container", "dijit/_TemplatedMixin",
		"dijit/_WidgetsInTemplateMixin","dojo/Stateful","../Editor",
		"dojo/text!./repeated_embedded_attribute.html", "dijit/form/TextBox","./TableElementDecorator","dijit/form/Button"//
], function(lang, array, declare, _WidgetBase, _Container, _TemplatedMixin,
		_WidgetsInTemplateMixin, Stateful,Editor,template, TextBox,TableElementDecorator,Button) {

	return declare("app.RepeatedEmbeddedWidget", [ _WidgetBase, _Container,
			_TemplatedMixin, _WidgetsInTemplateMixin ], {
		templateString : template,
		postCreate : function() {
			var attribute=this.get("meta");
			var panelModel = new dojo.Stateful();
			panelModel.set("title", "");
			var me=this;
			var modelHandle = this.get("modelHandle");
			var editor;
			//if (modelHandle) {
				var model = modelHandle;
			//}else{
				//var model = new Stateful();
				//modelHandle.set(attribute.code,model);
			//}
			if (this.meta.validTypes && this.meta.validTypes.length>1) {
				//editor = new PolymorphicMemberWidget({"modelHandle":model,"meta":this.meta,nullable:false,editorFactory:this.editorFactory});
			}else{
				var meta = this.meta.validTypes ? this.meta.validTypes[0] : this.meta;
				//editor = new Editor({"modelHandle":model,"meta":meta,editorFactory:this.editorFactory});
				array.forEach(this.meta.validTypes[0].attributes,function(attribute) {
					var tdWidget=this.editorFactory.attributeFactoryFinder.getFactory(attribute).create(attribute,modelHandle);
					var decorator=new TableElementDecorator();
					decorator.addChild(tdWidget);
					this.addChild(decorator);
				},this);
			}
			var decorator=new TableElementDecorator();
			var deleteButton=new Button({label:"delete"});
			decorator.addChild(deleteButton);
			this.addChild(decorator);
			//this.addChild(editor);
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
