define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
		"dojox/mvc/_Container", "dojox/mvc/at", 
		"dojo/dom-construct", "./EditorFactory", "dojo/Stateful",
		"dojox/mvc/Group", "dijit/form/TextBox" ], function(array, lang,
		declare, Container, at, domConstruct,
		EditorFactory, Stateful) {

	// at needs to be globally defined.
	window.at = at; 
	return declare("app.Editor", [ Container ], {
		editorFactory : new EditorFactory(),
		widget : null,

		children : null,
		modelHandle : null,
		meta : null,

		// _relTargetProp: String
		// The name of the property that is used by child
		// widgets for relative
		// data binding.
		_relTargetProp : "children",

		// //////////////////// PRIVATE METHODS
		// ////////////////////////

		postCreate : function() {
			this.inherited(arguments);
			this.watch("meta", lang.hitch(this, "_buildContained"));
			if (this.meta) {
				this._buildContained();
			}
		},
		startup : function() {
			this.inherited(arguments);
		},
		_buildContained: function() {
			if (this.modelHandle == null) {
				this.modelHandle = new Stateful();
			}
			try {
				this.widget = this.editorFactory.create(this.get("meta"),
						this.modelHandle);
				if (this.widget && this.domNode) {
					domConstruct.place(this.widget.domNode, this.domNode);
					this.widget.startup();
				}
			} catch (e) {
				console.log("cannot create editor. " + e.message+" "+ e.stack);
				 throw e;
			}
		},
		_destroyBody : function() {
			if (this.widget != null) {
				this.widget.destroy();
				this.widget = null;
			}
		}

	});
	
});
