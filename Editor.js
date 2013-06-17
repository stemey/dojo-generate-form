define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
		"dojox/mvc/_Container", "dijit/layout/_LayoutWidget","dojox/mvc/at", 
		"dojo/dom-construct", "dojo/Stateful", "./getPlainValue","./updateModelHandle","./hasChanged","./group/_GroupMixin" ], function(array, lang,
		declare, Container, _LayoutWidget,at, domConstruct,
		 Stateful,getPlainValue,updateModelHandle,hasChanged,_GroupMixin) {
		// module: 
		//		gform/Editor

	// at needs to be globally defined.
	window.at = at; 

	return declare("gform.Editor", [ Container,_GroupMixin ], {
		// summary:
		//		this widget generates a form based on a schema.
		editorFactory : null,
		// summary:
		// 		the editorFactory is responsible for translating the schema into a widget tree.

		widget : null,

		children : null,
		modelHandle : null,
		// summary:
		// 		the data that is bound to the form.
		meta : null,
		// summary:
		// 		the schema describing the form.

		// _relTargetProp: String
		// The name of the property that is used by child
		// widgets for relative
		// data binding.
		_relTargetProp : "children",
		isLayoutContainer:true,
		
		// remember all field paths where an explicit error message was added via addError()
		_explicitErrorPaths : [],

		// //////////////////// PRIVATE METHODS
		// ////////////////////////

		setMetaAndPlainValue: function(meta,value) {
			this.meta=meta;
			this.modelHandle=updateModelHandle.createMeta();
			updateModelHandle.update(this.meta,value,this.modelHandle,this.editorFactory);
			this.modelHandle.oldValue=getPlainValue(this.modelHandle);
			
			this._explicitErrorPaths = [];
			
			this._buildContained();
		},
		_setPlainValueAttr: function(value) {
			if (value==null) {
				value={};
			}
			if (!this.modelHandle) {
				this.modelHandle=updateModelHandle.createMeta();
			}
			if (!this.meta) {
				throw new Error("cannot set plainValue before setting meta");
			}
			updateModelHandle.update(this.meta,value,this.modelHandle,this.editorFactory);
			this.modelHandle.oldValue=getPlainValue(this.modelHandle);
			
			this._explicitErrorPaths = [];
		},
		_getPlainValueAttr: function() {
			return getPlainValue(this.modelHandle);
		},
		_setMetaUrlAttr: function(url) {
			var me = this;
			require(["dojo/text!"+url],function(metaJson) {
				me.set("meta",dojo.fromJson(metaJson));
			});
		},
		hasChanged: function() {
		// summary:
		// 		returns true if the data was changed.
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
				this.set("plainValue",{});
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
		// summary:
		//		add an error message to an attribute defined by the path.
			this.visit(path,function(model) {
				model.set("valid",false);
				model.set("message",message);
			});
			this._explicitErrorPaths.push(path);
		},
		resetErrors: function() {
		// summary:
		//		reset all field errors that were added via addError().
			array.forEach(this._explicitErrorPaths, function(path) {
				try {
					this.visit(path,function(model) {
						model.set("valid",true);
						model.set("message",null);
					});
				} catch (e) {
					// property does not exist any more. maybe because of type changes.
				}	
			}, this);
			this._explicitErrorPaths = [];
		},
		updateValue: function(path,value) {
		// summary:
		//		update an attribute of the data.
			this.visit(path,function(model) {
				model.set("value",value);
			});
		},
		visit: function(path,cb) {
		// summary:
		//		visit the data attribute defined by the path. The path elements are separated by dots -even the indices (e.g.: "person.friends.1.name"). 
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
		// summary:
		//		reset the data to its original value.
			var oldValue=this.modelHandle.oldValue;
			this.set("plainValue",oldValue);
		},	
		setMetaAndValue: function(meta,plainValue) {
		// summary:
		//		change the form and its data.
			this.meta=meta;
			this.modelHandle=null;
			this.set("plainValue",plainValue);
			this._buildContained();
		},	
		_destroyBody : function() {
			if (this.widget != null) {
				this.widget.destroy();
				this.widget = null;
			}
		}

	});
	
});
