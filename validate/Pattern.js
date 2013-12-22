define([
	"dojo/_base/lang",
	"dojo/i18n!../nls/validate"
], function (lang, nls) {
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
			if (matches == null || matches[0] === "") {
				var msg = lang.replace(nls.pattern, {pattern: pattern});
				errors.push({path: "", message: msg});
			}
			return errors;
		};
	};


});
