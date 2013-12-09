define([
], function () {
// module:
//		gform/createStandardEditorFactory


	return function (min) {
		return  function (modelHandle) {
			var plainValue = modelHandle.getPlainValue();
			var errors = [];
			if (typeof plainValue === "number") {
				if (plainValue < min) {
					errors.push({path: "", message: "{gform.validation.min}"});
				}
			}
			return errors;
		};
	};


});
