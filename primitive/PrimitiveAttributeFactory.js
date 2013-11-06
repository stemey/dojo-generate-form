define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"../model/PrimitiveModel",
], function(array, lang, declare, PrimitiveModel) {

	return declare( [], {
		createModel: function(meta, plainValue) {
			var model = new PrimitiveModel();
			model.update(plainValue);
			return model;
		}
	});
	
});
