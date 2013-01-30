define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"]//
, function(array, lang, declare) {

	var visit = function(stateful,visitor,key,propValue){
			for (key in stateful) {
				if (key != "_watchCallbacks" && key != "_attrPairNames" ) {
					 propValue =stateful[key];
					if (visitor(propValue) && lang.isObject(propValue) ) {
						 //visit(propValue,visitor);
					}					
				}
			}
		}
	return visit;
})
