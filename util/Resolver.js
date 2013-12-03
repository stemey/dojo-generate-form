define([
	"dojo/when",
	"dojo/_base/Deferred",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/promise/all",
	"dojo/request/xhr"
], function (when, Deferred, array, declare, lang, all, xhr) {
// module:
//		gform/util/Resolver


	return declare("gform.Resolver", [], {
		// summary: 
		//		Resolver helps resolving references.
		constructor: function (kwargs) {
			lang.mixin(this, kwargs);
		},
		baseUrl: "",
		values: {},
		createReference: function (id, setter) {
			// summary:
			//		a reference is added
			// id:
			//		the value of the reference
			// setter:
			//		function to be called when ref is resolved.
			return {id: id, setter: setter, resolver: this};
		},
		addElement: function (element) {
			// summary:
			//		an element with an id was found
			// element:
			//		the element with id
			if (element.id) {
				this.values[element.id] = element;
			}
		},
		finish: function (references, baseUrl) {
			// summary:
			//		resolve references (asynchronuously) and updates the object.
			// returns: dojo/Promise
			//		returns a promise		
			var deferred = [];
			array.forEach(references, function (ref) {
				var value = this.values[ref.id];
				if (typeof value === "undefined") {
					if (ref.id.substring(0, 1) === "#") {
						throw new Error("path reference not implemented");
					} else {
						deferred.push(this.load(ref, baseUrl));
					}
				} else {
					ref.setter(value);
				}
			}, this);
			return all(deferred);
		},
		resolveInternally: function (obj, setter, baseUrl) {
			var references = [];
			if (lang.isObject(obj) || lang.isArray(obj)) {
				for (var name in obj) {
					if (obj.hasOwnProperty(name)) {
						if (name === "$ref") {
							references.push(this.createReference(obj.$ref, setter));
							break;
						} else if (name === "id") {
							this.addElement(obj);
						} else {
							setter = (function (obj1, name1) {
								return    function (value) {
									obj1[name1] = value;
								};
							})(obj, name);
							references = references.concat(this.resolveInternally(obj[name], setter, baseUrl));
						}
					}
				}
			}
			return references;
		},
		resolve: function (obj, setter, baseUrl) {
			baseUrl = baseUrl || this.baseUrl;
			var references = this.resolveInternally(obj, null, baseUrl);
			return this.finish(references, baseUrl);
		},
		load: function (/*String*/ref, baseUrl) {
			// summary:
			//		load an external reference
			// ref:
			//		the reference value
			var url;
			if (ref.id.substring(0, 1) === "/") {
				url = ref.id;
			} else if (ref.id.substring(0, 2) === "./") {
				url = baseUrl + ref.id.substring(2);
			} else {
				url = baseUrl + ref.id;
			}

			var index = url.lastIndexOf("/");
			var newBaseUrl;
			if (index >= 0) {
				newBaseUrl = url.substring(0, url.lastIndexOf("/") + 1);

			} else {
				newBaseUrl = baseUrl;

			}

			var deferred = new Deferred();
			var request = xhr(url, {handleAs: "json", method: "GET"});
			var me = this;
			console.debug("loading " + url);
			request.then(
				function (embedded) {
					console.debug("loaded " + url);
					embedded.id = ref.id;
					ref.setter(embedded);
					me.values[ref.id] = embedded;
					var dependentPromise = me.resolve(embedded, null, newBaseUrl);
					when(dependentPromise).then(function () {
						console.debug("resolve " + newBaseUrl);
						deferred.resolve();
					}).otherwise(function () {
							console.debug("reject " + newBaseUrl);
							deferred.reject();
						});

				},
				function (e) {
					console.log("cannot find entity " + ref.id + " " + e.message);
					deferred.reject(e);
				}
			);

			return deferred.promise;
		}

	});

});
