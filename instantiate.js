define([
	"dojo/_base/array",
	"dojo/_base/lang"
],  function(array, lang){
			var copyFunc = function(value,fallback) {
	 				if (value.__type) {
	 					var constructor=lang.getObject(value.__type);
						if (constructor && typeof constructor=="function") {
							var copiedValue=constructor();
						}else{
								var copiedValue={};						
						}
						lang._mixin(copiedValue, value,copyFunc);
						return copiedValue;
					}else if (value instanceof Array) {
						var copiedValue=[];
						array.forEach(value,function(e) {
							copiedValue.push(copyFunc(e));
						});
						return copiedValue;
					}
					else {
						return value;
					} 
			}
			return copyFunc;
	}
);
