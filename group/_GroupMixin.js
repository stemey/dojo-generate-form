define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"//
], function(array, lang, declare) {

	return declare( null, {
		// summary:
		//		provides errorCount and stateCount properties. Should be mixed into all Decorators and Groups.
		// description:
		//		the _GroupMixin listens to modelHandle.state and updates the cached errorCount and incompleteCount. 
		//		It also listens to state-changed fire by embedded attributes and updates the state counts. 
		//		It provides two properties errorCount and incompleteCount which describes the associated attribute's state. 
		// isValidationContainer: Boolean
		//		Can be used by the parent to delegate to this widget validation methods. 
		isValidationContainer:true,

		// validateChildren
		//		if false the children will not be validated. TODO probably the same as getChildrenToValidate() returns empty array.
		validateChildren:true,

		// persistable: Boolean
		//		if this.modelHandle is set then persistable is true and the state counts will be cached in the modelhandle. Otherwise the state counts will be recalculated on each call.
		persistable:false,

		// validWatch: Object
		//		watchHandle to modelHandle.state
		validWatch : null,

		// modelHandle: dojo/Stateful
		//		the modelHandle provides access to attributes' state. Also used to cache state count.
		validWatch : null,

		// ignoreEvents: boolean
		//		validation works in two modes. When a value changes validation is triggered by the bubbling change evnts.
		//		The errors are cached if there is an appropriate modelHandle otherwise recalculated at each level.
		//		The other mode is validation starting at the root. IgnoreEvents is set to true in that mode so that validation is not triggerd by change events.		 
		ignoreEvents:false,

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
		validateAndFire: function(errorCount){
			// summary:
			//		get the children errorCounts and cache the value. Then emit state-change
			errorCount= this.validate();
			if (this.persistable) {
				this.set("errorCount",errorCount);
			}

			this.emit("state-changed",{source:this});
		},
		getErrorCount: function() {
		// summary:
		//		calculate the error count of all contained attributes.
		// returns: int
		//		number of errors
			return this.get("errorCount");
		},
		getIncompleteCount: function() {
		// summary:
		//		calculate the incomplete count of all contained attributes.
		// returns: int
		//		number of incomplete attributes
			return this.get("incompleteCount");
		},
		getChildrenToValidate: function() {
			// summary:
			//		returns the children widgets to validate.
			return this.getChildren() || children;
		},	
		reset: function() {
		// summary:
		//		resets the message and state in children. Also  resets the _hasBeenBlurred property in children.
			if (this.validateChildren) {
				this._resetChildren(this.getChildrenToValidate());
			}
		},		
		validate : function(/*boolean*/force, errorCount, oldIgnoreEvents) {
		// summary:
		//		validates the children of this group and returns the errorCount.
		// force:
		//		if set to true will force validation of dijits, so that they will be in state "Error" rather than "Incomplete".
			oldIgnoreEvents=this.ignoreEvents;
			this.ignoreEvents=true;
			errorCount=0;	
			if (this.validateChildren) {
				errorCount+= this._validateChildren(this.getChildrenToValidate(),force);
			}
			if (force && this.validateModel) {
				errorCount+=this.validateModel();
			} 
			if (this.modelHandle && this.modelHandle.get("state")=="Error") {
				errorCount++;	
			}
			this.set("errorCount", errorCount);
			this.ignoreEvents=oldIgnoreEvents;
			return errorCount;
		},
		onModelStateChanged: function(propName,old,nu) {
			if (this.ignoreEvents) {
				return;
			}
			if (old!=nu ) {
				this.validateAndFire();
			}
		},
		childValueChanged: function(prop, old, nu) {
			if (this.ignoreEvents) {
				return;
			}
			this.validateAndFire();
		},
		onStateChanged: function(event) {
			if (this.ignoreEvents || event.source==this) {
				console.log("ignore "+this.id);
				return;
			}
			console.log("bubble "+this.id);
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
						//console.debug("reset blur "+child.id);
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
