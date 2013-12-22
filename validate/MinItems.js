define([
	"dojo/_base/lang",
	"dojo/i18n!../nls/validate"
], function (lang, nls) {
// module:
//		gform/createStandardEditorFactory


	return function (minItems) {
		return  function (model) {
			// TODO currently only handles one unique property
			var errors = [];
			if (model != null && model.length() < minItems) {
				var msg = lang.replace(nls.minItems, {minItems: minItems});
				errors.push({path: "", message: msg});
			}
			return errors;

		};
	};


});
