define(["dojo/_base/declare", "dojo/store/Memory" ],
function(declare, Memory){

	var currentId=1000;

return declare([Memory], {
	add: function(object, options){
		if (!object[this.idProperty]) {
			currentId+=1;
			object[this.idProperty]=currentId;
		}	
		return this.inherited(arguments);
	}
});

});
