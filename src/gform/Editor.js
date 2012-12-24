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
		},
		_setChildrenAttr : function(/* dojo/Stateful */value) {
			// summary:
			// Handler for calls to set("children", val).
			// description:
			// Sets "ref" property so that child widgets can
			// refer to, and then
			// rebuilds the children.
			
			this._set("children", value);
			this.modelHandle=value;
//			if(this._started && (!this._builtOnce || children != value)){
				this._builtOnce = true;
				this._buildContained(value);
//			}			// this.binding is the resolved ref, so not matching
			// with the new
			// value means change in repeat target.
			// if(this.binding != value){
			// this.set("ref", value);
			// }
			// if(this._started && (!this._builtOnce || children
			// != value)){
			// this._builtOnce = true;
			// this._buildContained(value);
			// }
		},

		_buildContained : function() {
			// summary:
			// Destroy any existing generated view, recreate it
			// from scratch
			// parse the new contents.
			// children: dojo/Stateful
			// The array of child widgets.
			// tags:
			// private

			this._destroyBody();

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
		startup : function() {
			this.inherited(arguments);
			if (this.widget) {
				//this.widget.startup();
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
