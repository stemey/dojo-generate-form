define([
], function () {
// module:
//		gform/createStandardEditorFactory


	return function (pattern) {
		var regex = new RegExp(pattern);
		return  function (modelHandle) {
			var plainValue = modelHandle.getPlainValue();
			if (plainValue == null) {
				return [];
			}
			var matches = plainValue.match(regex);
			var errors = [];
			if (matches == null) {
				errors.push({path: "", message: "regex"});
			}
			return errors;
		};
	};


});
