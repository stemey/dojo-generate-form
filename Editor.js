define([ "dojo/_base/array", "dojo/aspect", "dojo/_base/lang", "dojo/_base/declare",
		"dojox/mvc/_Container", "dijit/layout/_LayoutWidget","dojox/mvc/at", 
		"dojo/dom-construct", "dojo/Stateful", "./getPlainValue","./updateModelHandle","./hasChanged","./group/_GroupMixin" ], function(array, aspect,  lang,
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
			if (value==null) {
				value={};
			}
			this.meta=meta;
			this.modelHandle=updateModelHandle.createMeta();
			updateModelHandle.update(this.meta,value,this.modelHandle,this.editorFactory);
			this.modelHandle.oldValue=getPlainValue(this.modelHandle);
			// send change event beause oldValue changed and hasChanged will return something new
			this.emit("value-changed");
			
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
			// send change event because oldValue changed and hasChanged will return something new
			this.emit("value-changed");
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
			this.dim=dim;
			if (this.widget && this.widget.resize) {
				if (dim) {
					this.widget.resize({t:0,l:0,w:dim.w,h:dim.h});
				} else {
					this.widget.resize();
				}
			}
		},
		postCreate : function() {
			this.inherited(arguments);
			this.containerNode=this.domNode;
			this.watch("meta", lang.hitch(this, "_buildContained"));
			if (this.meta) {
				this._buildContained();
			}
		},
		startup : function() {
			this.inherited(arguments);
			this._started=true;
			if (this.widget) {
				this.widget.startup();
			}
			this.resize();
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
					if (typeof this.get("doLayout")!="undefined") {
						this.widget.set("doLayout",this.get("doLayout"));
						var widget = this.widget;	
						if (widget.resize) {
							aspect.after(this.widget,"startup",function() {
							//	widget.resize();
							});
						}
					}
					if (this.widget && this.domNode) {
						domConstruct.place(this.widget.domNode, this.domNode);
						if (this._started) {
							this.widget.startup();
						}
					}
					if (this._started && this.dim) {
						this.resize(this.dim);
					}else if (this._started){
						this.resize();
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
				model.set("state","Error");
				model.set("message",message);
			});
			this._explicitErrorPaths.push(path);
		},
		resetErrors: function() {
		// summary:
		//		reset all field errors that were added via addError().
			array.forEach(this._explicitErrorPaths, function(path) {
				this.visit(path,function(model) {
					model.set("state","");
					model.set("message",null);
				});
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
			//TODO we need to consult the editorFactory t do this properly. 
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
		_destroyBody : function() {
			if (this.widget != null) {
				this.widget.destroy();
				this.widget = null;
			}
		}


	});
	
});
