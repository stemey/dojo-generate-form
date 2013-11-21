define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare", "./Resolver"
], function (array, lang, declare, Resolver) {
// module:
//		gform/util/refresolve

	return {
		getModelHandle: function (modelHandle, path) {
			var pathElements = path.split(".");
			//TODO we need to consult the editorFactory to do this properly. 
			array.forEach(pathElements, function (pathElement) {
				if (!modelHandle) {
					throw new Error("cannot resolve path " + path);
				}
				modelHandle = modelHandle.value;
				if (!modelHandle) {
					throw new Error("cannot resolve path " + path);
				}
				modelHandle = modelHandle[pathElement];
			}, this);
			if (!modelHandle) {
				throw new Error("cannot resolve path " + path);
			}
			return modelHandle;
		}
	}

});
