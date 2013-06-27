define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/Stateful",//
"dojox/mvc/getPlainValue"//
], function(array, lang, declare, Stateful, getPlainValue) {
// module:
//		gform/model/getPlainValue

   
	var getPlainValueOptions = {
		getType : function(/* Anything */v) {
			
			if (v==null) {
				return "value";
			}else
			if (v.__type) {
				return v.__type;
			}
			else {
				return lang.isArray(v) ? "array" : v != null
						&& {}.toString.call(v) == "[object Object]" ? "object"
						: "value";
			}
		},
		getPlainMeta : function(/* Anything[] */a) {
			if (a.ignore) {
				return undefined;
			}else{
				return getPlainValue(a.value,this);
			}
		},
		getPlainMap: function(arrayValue) {
			var keyCode = arrayValue.__key;
			var plainValue={};
			arrayValue.forEach(function(element) {
					var value =options.getPlainMeta(element);
					var key = value[keyCode];
					delete value[keyCode];
					plainValue[key]=value;	
			});
			return plainValue;
		},
		getPlainPrimitiveMap: function(arrayValue) {
			var keyCode = arrayValue.__key;
			var plainValue={};
			arrayValue.forEach(function(element) {
					var value =options.getPlainMeta(element);
					var key = value[keyCode];
					delete value[keyCode];
					plainValue[key]=value["value"];	
			});
			return plainValue;
		}
	}
  var options = {};
	lang.mixin(options,getPlainValue);
	lang.mixin(options,getPlainValueOptions);
	
	var getPlainValueWithMetaData = function(modelHandle) {
// summary:
//		This getPlainValue extends dojox/mvc/model/getPlainValue so that modelhandles can be converted to plainValues. 
// modelHandle: dojo/Stateful
//		the modelHandle
// returns: Object
//		returns the plainValue	
		return getPlainValue(modelHandle, options);
	}
	return getPlainValueWithMetaData;
})
