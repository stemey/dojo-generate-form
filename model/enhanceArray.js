define([ 
"dojo/_base/lang",//
"dojo/_base/array",//
"dojo/_base/declare",//
"./path",//
], function(lang, array, declare, path) {
// module:
//		gform/ValidationRegistrar


	return function(arrayModel) {
			arrayModel.value.watch(function(){
				var i=0;
				array.forEach(arrayModel.value,
					function(e){
						e.set("index",i++);
						e.parent=arrayModel;
					}
				)
			});
			var i=0;
			array.forEach(arrayModel.value,
				function(e){
					e.set("index",i++);
					e.parent=arrayModel;
				}
			)
		}		

});
