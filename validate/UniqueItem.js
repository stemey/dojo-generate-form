define([
	"dojo/_base/lang",
	"dojo/i18n!../nls/validate"
], function (lang, nls) {


	return function () {
		return  function (modelHandle) {
			var uniqueItems = [];
			var errors = [];
			modelHandle.forEach(function (el, idx) {
				var elementValue =  el.getPlainValue();
				if (elementValue!=null) {
					if (uniqueItems.indexOf(elementValue)>=0) {
						var msg = lang.replace(nls.uniqueItem, {unique: elementValue});
						errors.push({path: ""+idx , message: msg});
					}else {
						uniqueItems.push(elementValue);
					}

				}
			}, this);
			return errors;
		};
	};


});
