define([
], function () {
// module:
//		gform/createStandardEditorFactory


	return function (max) {
		return  function (modelHandle) {
			var plainValue = modelHandle.getPlainValue();
			var errors = [];
			if (typeof plainValue === "number") {
				if (plainValue > max) {
					errors.push({path: "", message: "{gform.validation.max}"});
				}
			}
			return errors;
		};
	};


});
