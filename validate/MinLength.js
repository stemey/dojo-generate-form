define([
	"dojo/_base/lang",
	"dojo/i18n!../nls/validate"
], function (lang, nls) {
// module:
//		gform/createStandardEditorFactory


	return function (minLength) {
		return  function (modelHandle) {
			var plainValue = modelHandle.getPlainValue();
			var errors = [];
			if (typeof plainValue === "string") {
				if (plainValue.length < minLength) {
					var msg = lang.replace(nls.minLength, {minLength: minLength});
					errors.push({path: "", message: msg});
				}
			}
			return errors;
		};
	};


});
