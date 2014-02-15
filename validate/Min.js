define([
	"dojo/_base/lang",
	"dojo/i18n!../nls/validate"
], function (lang, nls) {
// module:
//		gform/createStandardEditorFactory


	return function (min) {
		return  function (modelHandle) {
			var plainValue = modelHandle.getPlainValue();
			var errors = [];
			if (typeof plainValue === "number") {
				if (plainValue < min) {
					var msg = lang.replace(nls.min, {min: min});
					errors.push({path: "", message: msg});
				}
			}
			return errors;
		};
	};


});
