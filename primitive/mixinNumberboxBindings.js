define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/aspect",//
"dojox/mvc/at",//
"./nullableNumberConverter",//
], function(array, lang, declare, aspect, at, converter) {

	return function(modelHandle,props) {
			props["value"]=at(modelHandle, "value").transform(converter);
			props["state"]= at(modelHandle, "state");
			props["message"]=at(modelHandle, "message");

	}
	
});
