define([
], function () {
// module:
//		gform/createStandardEditorFactory


	return function (pattern) {
		var regex = new RegExp(pattern);
		return  function (modelHandle) {
			// TODO currently only handles one unique property
			var matches = modelHandle.getPlainValue().match(regex);
			var errors = [];
			if (matches == null) {
				errors.push({path: "", message: "regex"});
			}
			return errors;
		};
	};


});
