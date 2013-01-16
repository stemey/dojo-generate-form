define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
		"dojox/mvc/_Container", "dojox/mvc/at", 
		"dojo/dom-construct", "dojo/Stateful", "./getStateful","./getPlainValue" ], function(array, lang,
		declare, Container, at, domConstruct,
		 Stateful,getStateful,getPlainValue) {

	// at needs to be globally defined.
	window.at = at; 
	return declare("app.Editor", [ Container ], {
		editorFactory : null,
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

		_setPlainValueAttr: function(value) {
				this.set("modelHandle",getStateful(value));
		},
		_getPlainValueAttr: function() {
				return getPlainValue(this.modelHandle);
		},
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
				this.modelHandle = getStateful({});
			}
			try {
				if (this.widget) {
					this.widget.destroy();
				}
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
