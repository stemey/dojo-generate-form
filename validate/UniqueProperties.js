define([
], function () {
// module:
//		gform/createStandardEditorFactory


	return function (uniqueProperties) {
		return  function (modelHandle) {
			// TODO currently only handles one unique property
			var prop = uniqueProperties[0];
			var uniqueKeys = {};
			var errors = [];
			if (modelHandle.hasChildrenErrors()) {
				console.log("no model validation");
				return [];
			}
			modelHandle.forEach(function (el, idx) {
				var value = el.getModelByPath(prop).getPlainValue();
				var unique = uniqueKeys[value] == null;
				if (unique) {
					uniqueKeys[value] = value;
				} else {
					errors.push({path: idx + "." + prop, message: "{gform.validation.unique}"});
				}
			}, this);
			console.log("model validation resulted in " + errors.length);
			return errors;
		};
	};


});
