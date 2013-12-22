define([
	"dojo/_base/lang",
	"dojo/i18n!../nls/validate"
], function (lang, nls) {
// module:
//		gform/createStandardEditorFactory


	return function (maxItems) {
		return  function (model) {
			// TODO currently only handles one unique property
			var errors = [];
			if (model != null && model.length() > maxItems) {
				var msg = lang.replace(nls.maxItems, {maxItems: maxItems});
				errors.push({path: "", message: msg});
			}
			return errors;

		};
	};


});
