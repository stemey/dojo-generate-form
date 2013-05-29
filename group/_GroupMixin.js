define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"//
], function(array, lang, declare) {

	return declare("gform.group._GroupMixin", null, {
		// summary:
		//		the _GroupMixin listens to modelHandle.state and updates the cached errorCount and incompleteCount. 
		//		It also listens to state-changed fire by embedded attributes and updates the state counts. 
		//		It provides two properties errorCount and incompleteCount which describes the associated attribute's state. 
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
			this.on("state-changed",lang.hitch(this,"onStateChanged"));
			if (this.persistable) {
				this.validWatch=this.modelHandle.watch("state",lang.hitch(this,"onModelStateChanged"));
			}
		},
		destroy: function() {
			this.inherited(arguments);
			if (this.validWatch) {
				this.validWatch.remove();
			}
		},
		reset: function() {
			console.debug("reset "+this.id);
			if (this.validateChildren) {
				this._resetChildren(this.getChildrenToValidate());
			}
		},		
		validate : function(/*boolean*/force, errorCount) {
		// summary:
		//		validates the children of this group and returns the errorCount.
		// force:
		//		if set to true will force validation of dijits, so that they will be in state "Error" rather than "Incomplete".
			errorCount=0;	
			if (this.validateChildren) {
				errorCount+= this._validateChildren(this.getChildrenToValidate(),force);
			}
			if (this.modelHandle && this.modelHandle.get("state")=="Error") {
				errorCount++;	
			}
			return errorCount;
		},
		onModelStateChanged: function(propName,old,nu) {
			if (old!=nu) {
				this._validateAndFire();
			}
		},
		
		onStateChanged: function(event) {
			if (event.source==this) {
				return;
			}
			event.stopPropagation();
			this._validateAndFire();
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
		_validateAndFire: function(errorCount){
			// summary:
			//		get the children errorCounts and save the value. emit state-change
			errorCount=this.validate();
			if (this.persistable) {
				this.set("errorCount",errorCount);
			}
			this.emit("state-changed",{source:this});
		},
		
		getChildrenToValidate: function() {
			// summary:
			//		returns the children widgets to validate.
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
		
		_resetChildren: function(children){
			if (children) {
				array.forEach(children,function(child,ec) {
					if (child.isValidationContainer) {
						child.reset();
					}else if (child.validate){
						// this will trigger an update to the errorCount in the surrounding GroupMixin. The number will be picked up later 
						console.debug("reset blur "+child.id);
						child._hasBeenBlurred=false;
						child.set("message",null);
						child.set("state","");
					}
				},this);
			}
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
				incompleteCount++;	
			}
			return incompleteCount;
		}
	});
});
