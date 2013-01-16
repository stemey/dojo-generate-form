define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/Stateful",//
"dojox/mvc/getPlainValue"//
], function(array, lang, declare, Stateful, getPlainValue) {

	var getPlainValueOptions = {
		getType : function(/* Anything */v) {

			if (v.__type) {
				v.__type;
			}
			else {
				return lang.isArray(v) ? "array" : v != null
						&& {}.toString.call(v) == "[object Object]" ? "object"
						: "value";
			}
		},
		getPlainArray : function(/* Anything[] */a) {
			// summary:
			// Returns the stateful version of the given array.
			// a: Anything[]
			// The array.
			// returns:
			// The converted array.

			return array.map(a.value, function(item) {
				return getPlainValue(item, this);
			}, this); // Anything[]
		},

		getPlainObject : function(/* Object */o) {
			// summary:
			// Returns the stateful version of the given object.
			// o: Object
			// The object.

			var plain = {};
			for ( var s in o.value) {
				if (!(s in Stateful.prototype) && s != "_watchCallbacks") {
					plain[s] = getPlainValue(o[s], this);
				}
			}
			return plain; // Object
		},

		getPlainValue : function(/* Anything */v) {
			// summary:
			// Just returns the given value.

			return v.value; // Anything
		}
	}
	var getPlainValueWithMetaData = function(v) {
		return getPlainValue(v, getPlainValueOptions);
	}
	return getPlainValueWithMetaData;
})
