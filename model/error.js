define([ 
"dojo/_base/lang",//
"dojo/_base/array",//
"dojo/_base/declare",//
"./path",//
], function(lang, array, declare, path) {
// module:
//		gform/ValidationRegistrar

	var x=  
		{
			add : function(modelHandle, errors) {
				array.forEach(errors, function(error) {
					var subModel =path.getModelHandle(modelHandle, error.path);
					subModel.set("message", error.message);
					subModel.set("state", "Error");
				});	
			},
			remove : function(modelHandle, errors) {
				array.forEach(errors, function(error) {
					var subModel =path.getModelHandle(modelHandle, error.path);
					subModel.set("message", null);
					subModel.set("state", "");
				});	
			},

		}
	return x;


});
