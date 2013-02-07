define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
		"dojox/mvc/_Container", "dijit/layout/_LayoutWidget","dojox/mvc/at", 
		"dojo/dom-construct", "dojo/Stateful", "./getStateful","./getPlainValue","./updateStateful","./hasChanged","./group/_GroupMixin" ], function(array, lang,
		declare, Container, _LayoutWidget,at, domConstruct,
		 Stateful,getStateful,getPlainValue,updateStateful,hasChanged,_GroupMixin) {

	// at needs to be globally defined.
	window.at = at; 

	return declare("gform.Editor", [ Container,_GroupMixin ], {
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
		isLayoutContainer:true,

		// //////////////////// PRIVATE METHODS
		// ////////////////////////

		_setPlainValueAttr: function(value) {
			if (value==null) {
				value={};
			}
			if (this.modelHandle) {
				updateStateful(value,this.modelHandle);
			}else{
				this.set("modelHandle",getStateful(value));
			}
		},
		_getPlainValueAttr: function() {
			return getPlainValue(this.modelHandle);
		},
		hasChanged: function() {
			return hasChanged(this.modelHandle);
		},
		resize: function(dim) {
			if (this.widget && this.widget.resize) {
				if (dim) {
					this.widget.resize({t:0,l:0,w:dim.w,h:dim.h});
				} else {
					this.widget.resize(null);
				}
			}
		},
		postCreate : function() {
			this.inherited(arguments);
			this.containerNode=this.domNode;
			//this.domNode.style.height="100%";
			//this.domNode.style.width="100%";
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
				if (this.get("meta") && this.editorFactory) {
					this.widget = this.editorFactory.create(this.get("meta"),
							this.modelHandle);
					if (this.widget && this.domNode) {
						domConstruct.place(this.widget.domNode, this.domNode);
						this.widget.startup();
					}
				}
			} catch (e) {
				console.log("cannot create editor. " + e.message+" "+ e.stack);
				 throw e;
			}
		},
		addError: function(path,message) {
			this.visit(path,function(model) {
				model.set("valid",false);
				model.set("message",message);
			});
		},
		updateValue: function(path,value) {
			this.visit(path,function(model) {
				model.set("value",value);
			});
		},
		visit: function(path,cb) {
			var pathElements=path.split(".");
			var model=this.get("modelHandle");
			array.forEach(pathElements,function(pathElement){
				if (!model) {
					throw new Error("cannot resolve path "+path);
				}
				model=model.value;
				if (!model) {
					throw new Error("cannot resolve path "+path);
				}
				model=model[pathElement];
			},this);
				if (!model) {
					throw new Error("cannot resolve path "+path);
				}
			cb(model);
		},
		reset: function() {
			var oldValue=this.modelHandle.oldValue;
			updateStateful(oldValue,this.modelHandle);
		},	
		
		_destroyBody : function() {
			if (this.widget != null) {
				this.widget.destroy();
				this.widget = null;
			}
		}

	});
	
});
