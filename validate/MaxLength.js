define([
], function () {
// module:
//		gform/createStandardEditorFactory


	return function (maxLength) {
		return  function (modelHandle) {
			var plainValue = modelHandle.getPlainValue();
			var errors = [];
			if (typeof plainValue === "string") {
				if (plainValue.length > maxLength) {
					errors.push({path: "", message: "{gform.validation.maxLength}"});
				}
			}
			return errors;
		};
	};


});
