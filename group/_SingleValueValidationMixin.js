define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"//
], function(array, lang, declare) {
//the primitve value decorator needs to listen to modelHandle.valid and return that from getErrorCOunt
//the complex decoator ust listen to modelHandle.valid and also listen to children.valid-changed. getErrorCOunt must be reset o event and must be updated on getErrorCOunt 
//
	return declare("gform.group._SingleValueValidationMixin", null, {
		postCreate : function() {
			this.inherited(arguments);
			if (this.modelHandle && typeof this.modelHandle.watch == "function") {
				this.modelHandle.watch("valid",lang.hitch(this,"onValidChange"));
			}else{
				console.log("modelHandle is null "+this.label);
			}
		},
		onValidChange: function(event) {
				this.emit("valid-changed",{source:this});
		},
		_validateChildren: function(children,errorCount){
			if (!children) {
				return 0;
			}
			errorCount=0;
			array.forEach(children,function(child) {
				if (child.isValidationContainer) {
					var ec = child.get("errorCount");
					errorCount+=ec;
				}else{
					errorCount+=this.validateChildren(child.getChildren());
				}
			},this);
			return errorCount;
		},
		validate : function() {
			return this._validateChildren(this.getChildren() || children);
		}
	})
});
