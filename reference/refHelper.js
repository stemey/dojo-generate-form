define([ "dojo/_base/lang", "dojo/_base/declare"
], function (lang, declare) {

	var RefHelper = declare([ ], {
		constructor: function (kwArgs) {
			lang.mixin(this, kwArgs);
		},
		getRefForId: function (attribute, id) {
			return {$ref: id};
		},
		getUrlForId: function (attribute, id) {
			return attribute.collectionUrl + "/" + id;
		},
		getIdForRef: function (attribute, ref) {
			return ref.$ref;
		},
		getUrlForRef: function (attribute, ref) {
			return attribute.collectionUrl + "/" + this.getIdForRef(attribute, ref);
		},
		getIdForUrl: function (attribute, url) {
			return url.substr((attribute.collectionUrl + "/").length, url.length);
		},
		getRefForUrl: function (attribute, url) {
			return getRefForId(attribute, this.getIdForUrl(attribute, url));
		}
	});
	return RefHelper;

});
