define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare" ], function(array, lang,
		declare, Container, at, domConstruct,
		 Stateful) {

	// at needs to be globally defined.
	var Meta= declare("kkk", [  ], {
		
		defaults:{
			"text":"",
			"int":0,
			"boolean":false			
		},
		getDefaultAttributeValue : function(attribute) {
			var  defaultValue=this.defaults[attribute.type];
			return defaultValue;
 		}
		

	});
	return new Meta();
	
});
