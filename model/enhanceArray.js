define([ 
"dojo/_base/lang",//
"dojo/_base/array",//
"dojo/_base/declare",//
"./path",//
], function(lang, array, declare, path) {
// module:
//		gform/ValidationRegistrar


	return function(modelHandle) {
			modelHandle.value.watch(function(){
				var i=0;
				array.forEach(modelHandle.value,
					function(e){
						e.set("index",i++);
					}
				)
			});
			var i=0;
			array.forEach(modelHandle.value,
				function(e){
					e.set("index",i++);
				}
			)
		}		

});
