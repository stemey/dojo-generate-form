define([
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/Stateful",
	"dojox/mvc/StatefulArray",
	"./getStateful"
], function(array, lang, Stateful, StatefulArray, getStateful){
	var updateStatefulOptions = {
		// summary:
		//		Options used for dojox/mvc/getStateful().

		getType: function(/*Anything*/ v){
			// summary:
			//		Returns the type of the given value.
			// v: Anything
			//		The value.

			return lang.isArray(v) ? "array" : v != null && {}.toString.call(v) == "[object Object]" ? "object" : "value";
		},

		updateStatefulArray: function(/*Anything[]*/ a,modelHandle){
			// summary:
			//		Returns the stateful version of the given array.
			// a: Anything[]
			//		The array.
			this.resetMeta(modelHandle,a);
			
			if (modelHandle.value) {
				modelHandle.value.splice(0,modelHandle.value.length);
			}else{
				modelHandle.value=new StatefulArray([]);
			}
			array.forEach(a, function(item){ modelHandle.value.push(getStateful(item)); }, this); // dojox/mvc/StatefulArray
		},

		updateStatefulObject: function(/*Object*/ o, modelHandle){
			// summary:
			//		Returns the stateful version of the given object.
			// o: Object
			//		The object.

			var target = modelHandle.value;
			this.resetMeta(modelHandle,o);
			for(var s in o){
				updateStateful(o[s],target.get(s), this);
			}
			for(var s in target._attrPairNames){
				console.log("---"+s+"   "+typeof s);
				if (typeof o[s]=="undefined") {
					delete target[s];
				}
			}
		},
		resetMeta: function(modelHandle,plainValue) {
			modelHandle.set("oldValue",plainValue);
			modelHandle.set("valid",true);
		},


		updateStatefulValue: function(/*Anything*/ v, modelHandle){
			// summary:
			//		Just returns the given value.
			this.resetMeta(modelHandle,v);
			modelHandle.set("value",v);
		}
	};

	var updateStateful = function(/*Anything*/ value, modelHandle,/*dojox/mvc/getStatefulOptions*/ options){
		// summary:
		//		Create a dojo/Stateful object from a raw value.
		// description:
		//		Recursively iterates the raw value given, and convert them to stateful ones.
		// value: Anything
		//		The raw value.
		// options: dojox/mvc/getStatefulOptions
		//		The object that defines how model object should be created from plain object hierarchy.
		// returns: Anything
		//		 The converted value.

		return (options || updateStatefulOptions)["updateStateful" + (options || updateStatefulOptions).getType(value).replace(/^[a-z]/, function(c){ return c.toUpperCase(); })](value,modelHandle); // Anything
	};

	// lang.setObject() thing is for back-compat, remove it in 2.0
	//return lang.setObject("dojox.mvc.getStateful", lang.mixin(getStateful, getStatefulOptions));
	return updateStateful;
});
