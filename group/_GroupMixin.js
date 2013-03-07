define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"//
], function(array, lang, declare) {
//the primitve value decorator needs to listen to modelHandle.valid and return that from getErrorCOunt
//the complex decoator ust listen to modelHandle.valid and also listen to children.valid-changed. getErrorCOunt must be reset o event and must be updated on getErrorCOunt 
//
	return declare("gform.group._GroupMixin", null, {
		isValidationContainer:true,
		validateChildren:true,
		persistable:false,
		
		validWatch : null,
		
		postCreate : function() {
			this.inherited(arguments);
			this.persistable=typeof this.modelHandle != "undefined" && this.modelHandle!=null;
				if (this.modelHandle && !this.modelHandle.tmp) {
					throw new Error("modelHandle.tmp is null");
				}
			this.on("valid-changed",lang.hitch(this,"onValidChanged"));
			if (this.persistable) {
				this.validWatch=this.modelHandle.watch("state",lang.hitch(this,"onModelValidChanged"));
			}
		},
		destroy: function() {
			this.inherited(arguments);
			if (this.validWatch) {
				this.validWatch.remove();
			}
		},
		
		getPrefix: function() {
			return this.id;	
		},
		
		onModelValidChanged: function(propName,old,nu) {
			if (old!=nu) {
				this.validateAndFire();
			}
		},
		
		onValidChanged: function(event) {
			if (event.source==this) {
				return;
			}
			event.stopPropagation();
			this.validateAndFire();
		},
		
		_getErrorCountAttr: function() {
			if (this.persistable) {
				var errorCount= this.modelHandle.tmp[this.id+"errorCount"];
				if (typeof errorCount == "number") {
					return errorCount;
				}else{
					return this.validate();
				}
			}	else{
				return this.validate();
			}
		},
		
		_getIncompleteCountAttr: function() {
			return this._getIncompleteCount();
		},
		
		_setErrorCountAttr: function(errorCount) {
			if (this.persistable) {
				this.modelHandle.tmp[this.id+"errorCount"]=errorCount;
			}
		},
		
		validateAndFire: function(errorCount){
			errorCount=this.validate();
			if (this.persistable) {
				this.set("errorCount",errorCount);
			}
			this.emit("valid-changed",{source:this});
		},
		
		getChildrenToValidate: function() {
			return this.getChildren() || children;
		},	
		
		_validateChildren: function(children,force,errorCount){
			if (!children) {
				return 0;
			}
			errorCount=0;
			array.forEach(children,function(child,ec) {
				if (child.isValidationContainer) {
					ec = force?child.validate(force):child.get("errorCount");
					errorCount+=ec;
				}else if (child.validate){
					// this will trigger an update to the errorCount in the surrounding GroupMixin. The number will be picked up later 
					if (force) {
						// set state to was edited
						child._hasBeenBlurred=true;
						child.validate()
					};
				}else{
					errorCount+=this._validateChildren(child.getChildren(),force);
				}
			},this);
			return errorCount;
		},
		
		validate : function(force,errorCount) {
			errorCount=0;	
			if (this.validateChildren) {
				errorCount+= this._validateChildren(this.getChildrenToValidate(),force);
			}
			if (this.modelHandle && this.modelHandle.get("state")=="Error") {
				errorCount++;	
			}
			return errorCount;
		},
		_getIncompleteCountChildren: function(children,incompleteCount){
			if (!children) {
				return 0;
			}
			incompleteCount=0;
			array.forEach(children,function(child,ec) {
				if (child.isValidationContainer) {
					ec = child.get("incompleteCount");
					incompleteCount+=ec;
				}else{
					incompleteCount+=this._getIncompleteCountChildren(child.getChildren());
				}
			},this);
			return incompleteCount;
		},
		
		_getIncompleteCount : function(incompleteCount) {
			incompleteCount=0;	
			if (this.validateChildren) {
				incompleteCount+= this._getIncompleteCountChildren(this.getChildrenToValidate());
			}
			if (this.modelHandle && this.modelHandle.get("state")=="Incomplete") {
				console.log("adding incomplete of "+this.meta.code);
				incompleteCount++;	
			}else{
				console.log("not adding incomplete of "+this.meta.code);
			}
			return incompleteCount;
		}
	});
});
