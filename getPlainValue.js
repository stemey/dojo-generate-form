define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/Stateful",//
"dojox/mvc/getPlainValue"//
], function(array, lang, declare, Stateful, getPlainValue) {
// module:
//		gform/getPlainValue
// summary:
//		This getPlainValue extends dojox/mvc/getPlainValue so that modelhandles can be converted to plainValues. modelHandles contain objects with a property "__type" with the value "meta". Only the value property is included in the plainValue. If the meta object has a property ignore with value true, the value is not included.

   
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
		}
	}
  var options = {};
	lang.mixin(options,getPlainValue);
	lang.mixin(options,getPlainValueOptions);
	
	var getPlainValueWithMetaData = function(v) {
		return getPlainValue(v, options);
	}
	return getPlainValueWithMetaData;
})
