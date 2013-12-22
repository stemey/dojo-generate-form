define([
	"dojo/_base/lang",
	"dojo/i18n!../nls/validate"
], function (lang, nls) {
// module:
//		gform/createStandardEditorFactory


	return function (maxLength) {
		return  function (modelHandle) {
			var plainValue = modelHandle.getPlainValue();
			var errors = [];
			if (typeof plainValue === "string") {
				if (plainValue.length > maxLength) {
					var msg = lang.replace(nls.maxLength, {maxLength: maxLength});
					errors.push({path: "", message: msg});
				}
			}
			return errors;
		};
	};


});
