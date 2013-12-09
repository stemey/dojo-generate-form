define([
], function () {
// module:
//		gform/createStandardEditorFactory


	return function (minItems) {
		return  function (model) {
			// TODO currently only handles one unique property
			var errors = [];
			if (model != null && model.length() < minItems) {
				errors.push({path: "", message: "{gform.validation.minItems}"});
			}
			return errors;

		};
	};


});
