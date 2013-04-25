define(["dojo/_base/declare", "dojo/Deferred", "dojo/store/Memory" ],
function(declare, Deferred, Memory){

	var finishDeferred = function(entity, returnValue) {
		var deferred = new Deferred();
		if ((returnValue && returnValue.error) || (entity && entity.error)) {
			window.setTimeout(function(){
				deferred.reject("error")
			},1);
		} else {
			window.setTimeout(function(){
				deferred.resolve(returnValue)
			},1);
		}
		return deferred;	
	}	

return declare([Memory], {
	get: function(id){
		return finishDeferred(null, this.inherited(arguments));
	},
	put: function(object, options){
		return finishDeferred(object, this.inherited(arguments));
	},
	add: function(object, options){
		return finishDeferred(object, this.inherited(arguments));
	},
	remove: function(id){
		return finishDeferred(null,this.inherited(arguments));
	}
});

});
