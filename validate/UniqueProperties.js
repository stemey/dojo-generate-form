define([
	"dojo/_base/lang",
	"dojo/i18n!../nls/validate"
], function (lang, nls) {


	return function (uniqueProperties) {
		return  function (modelHandle) {
			// TODO currently only handles one unique property
			var prop = uniqueProperties[0];
			var uniqueKeys = {};
			var errors = [];
			if (modelHandle.hasChildrenErrors()) {
				return [];
			}
			modelHandle.forEach(function (el, idx) {
				var elementValue =  el.getModelByPath(prop);
				if (elementValue!=null) {
					var value = elementValue.getPlainValue();
					var unique = uniqueKeys[value] == null;
					if (unique) {
						uniqueKeys[value] = value;
					} else {
						var msg = lang.replace(nls.unique, {unique: unique});
						errors.push({path: idx + "." + prop, message: msg});
					}
				}
			}, this);
			return errors;
		};
	};


});
