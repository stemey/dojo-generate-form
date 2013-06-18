define([ 
"dojo/_base/lang",//
"dojo/_base/array",//

], function(lang, array) {
// module:
//		gform/createStandardEditorFactory

// should be a class with attach(modelHandle, callback) and a validate(modelHandle) function. validate works on plainValue???. attach should observe model and elementPath
// general observe method: observe(path, model), observe(path). * in path means all children

		return function(uniqueProperties) {
			return  function( modelHandle) {
				var prop =uniqueProperties[0];
				var uniqueKeys ={};	
				var errors=[];
				array.forEach(modelHandle.value, function(el, idx) {
					var value = el.value[prop].value;
					var unique = uniqueKeys[value]==null;
					if (unique) {
						uniqueKeys[value] = value;
					} else {
						errors.push({path:idx+"."+prop, message: "not unique"});
					}
				});
				return errors;
			}
		}
		
	

});
