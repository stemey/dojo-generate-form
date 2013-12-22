define([
	"dojo/_base/lang",
	"dojo/i18n!../nls/validate"
], function (lang, nls) {
// module:
//		gform/createStandardEditorFactory


	return function (max) {
		return  function (modelHandle) {
			var plainValue = modelHandle.getPlainValue();
			var errors = [];
			if (typeof plainValue === "number") {
				if (plainValue > max) {
					var msg = lang.replace(nls.max, {max: max});
					errors.push({path: "", message: msg});
				}
			}
			return errors;
		};
	};


});
