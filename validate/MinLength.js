define([
], function () {
// module:
//		gform/createStandardEditorFactory


	return function (minLength) {
		return  function (modelHandle) {
			var plainValue = modelHandle.getPlainValue();
			var errors = [];
			if (typeof plainValue === "string") {
				if (plainValue.length < minLength) {
					errors.push({path: "", message: "{gform.validation.minLength}"});
				}
			}
			return errors;
		};
	};


});
