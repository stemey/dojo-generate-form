define([
	"dojox/mvc/at"
], function (at) {

	return function (modelHandle, props) {
		props["value"] = at(modelHandle, "value");
		props["state"] = at(modelHandle, "state");
		props["message"] = at(modelHandle, "message");
	};

});
