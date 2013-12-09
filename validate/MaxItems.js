define([
], function () {
// module:
//		gform/createStandardEditorFactory


	return function (maxItems) {
		return  function (model) {
			// TODO currently only handles one unique property
			var errors = [];
			if (model != null && model.length() > maxItems) {
				errors.push({path: "", message: "{gform.validation.maxItems}"});
			}
			return errors;

		};
	};


});
