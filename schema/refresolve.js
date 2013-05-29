define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare","./Resolver"
		 ], function(array, lang,	declare, Resolver) {
// module:
//		gform/schema/refresolve

	function resolveRecursively(/*Object*/obj, /*gform/schema/Resolver*/resolver) {
		// summary:
		//		resolve all references in the object. Handles external refs (e.g.: "/country/2" and refs by id "embedded_object". Does not resolve path-based references.
		// obj:
		//		The references in this object will be resolved.
		// resolver:
		//		The resolver helps resolving refs.
		// returns: dojo/Promise
		resolver = resolver || new Resolver();
		_resolve(resolver,obj,null);
		return resolver.finish();
	}

	function _resolve(resolver,obj,setter) {
		if (lang.isObject(obj) || lang.isArray(obj)) {
			for (var name in obj) {
				if (obj.hasOwnProperty(name)) {
					if (name=="$ref") {
						resolver.addReference(obj["$ref"],setter);
						break;
					}else	if (name=="id") {
						resolver.addElement(obj);
					}else{
						var setter = (function(obj1,name1) {
							return	function(value) {
								obj1[name1]=value;
							}
						})(obj,name);
						_resolve(resolver,obj[name],setter);
					}
				}
			}
		}
	}
	return resolveRecursively;
	
});
