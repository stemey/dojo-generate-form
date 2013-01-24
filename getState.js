define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare"//
, function(array, lang, declare) {

	var visit = function(stateful,visitor){
			for (var key in stateful) {
				if (key != "_watchCallbacks") {
					var goon = visitor.visit(stateful[key]);
					if (!goon) {
						return;
					}					
				}
			}
		}
	return visit;
})
