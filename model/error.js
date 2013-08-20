define([ 
"dojo/_base/lang",//
"dojo/_base/array",//
"dojo/_base/declare",//
"./path",//
], function(lang, array, declare, path) {
// module:
//		gform/ValidationRegistrar

	var error=  
		{
			add : function(modelHandle, errors) {
			// summary:
			//		add the errors to the modelHandle
			// modelHandle: dojo/Stateful
			// errors: array 
				array.forEach(errors, function(error) {
					var subModel =path.getModelHandle(modelHandle, error.path);
					subModel.set("message", error.message);
					subModel.set("state", "Error");
				});	
			},
			// summary:
			//		remove given errors to the modelHandle
			// modelHandle: dojo/Stateful
			// errors: array 
			remove : function(modelHandle, errors) {
				array.forEach(errors, function(error) {
					var subModel =path.getModelHandle(modelHandle, error.path);
					subModel.set("message", null);
					subModel.set("state", "");
				});	
			},

		}
	return error;


});
