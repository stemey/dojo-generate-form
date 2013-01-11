define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/Stateful"//

], function(array, lang, declare, Stateful) {

	return function(/* dojo/Stateful */stateful, /* string */property) {
		// summary:
		// updates the property in the modelHandle, so that it is a Stateful
		// instance.
		// If it was null then it will be an empty Stateful. If it was a
		// Stateful then nothing
		// eill be changed.
		//
		// stateful:
		// the stateful to be updated.
		//
		// property:
		// the property in stateful to be updated.
		//
		var value = stateful.get(property);
		if (!value) {
			value = new Stateful();
			stateful.set(property, value);
		} else if (value.declaredClass
				&& value.declaredClass == "dojo.Stateful") {

		} else {
			value = new Stateful(value);
			stateful.set(property, value);
		}
	}
})
