define([ "dojox/mvc/at",//
	"./nullableNumberConverter"//
], function (at, converter) {

	return function (modelHandle, props) {
		props.value = at(modelHandle, "value").transform(converter);
		props.state = at(modelHandle, "state");
		props.message = at(modelHandle, "message");

	}

});
