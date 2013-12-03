define([  "dojo/_base/lang", "./Resolver"
], function (lang, Resolver) {
// module:
//		gform/util/refresolve

	function resolveRecursively(/*Object*/obj, /*gform/util/Resolver*/resolver) {
		// summary:
		//		resolve all references in the object. Handles external refs (e.g.: "/country/2" and refs by id
		// 		"embedded_object". Does not resolve path-based references.
		// obj:
		//		The references in this object will be resolved.
		// resolver:
		//		The resolver helps resolving refs.
		// returns: dojo/Promise
		resolver = resolver || new Resolver();
		return resolver.resolve(obj, null);
	}


	return resolveRecursively;

});
