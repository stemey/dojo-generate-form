define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare","./Resolver"
		 ], function(array, lang,	declare, Resolver) {


	function resolveRecursively(obj,resolver) {
		resolver = resolver || new Resolver();
		_resolve(resolver,obj,null);
		var deferred = resolver.finish();
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
						//break;
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
