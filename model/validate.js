define([ 
"dojo/_base/lang",//
"dojo/_base/array",//
"dojo/_base/declare",//
"./error",//
], function(lang, array, declare, error) {
// module:
//		gform/ValidationRegistrar

	var validate= function() {
		this.errors=[];
		error.remove(this.modelHandle, this.oldErrors);
		array.forEach(this.validators, function(validator) {
			var more = validator(this.modelHandle);
			if (more) {
				array.forEach(more, function(error) {
					this.errors.push(error);
				}, this);
			}
		}, this);
		error.add(this.modelHandle,this.errors);	
		this.oldErrors = this.errors;
	}

	return function(modelHandle, validators) {
		var ctx ={oldErrors:[], modelHandle: modelHandle, validators:validators, errors:[]};
		return function() {
			setTimeout(function() {	validate.apply(ctx);}, 0);
		}	
	}

});
