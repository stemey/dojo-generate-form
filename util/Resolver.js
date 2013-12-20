define([
	"dojo/_base/url",
	"dojo/when",
	"dojo/_base/Deferred",
	"dojo/_base/array",
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/promise/all",
	"dojo/request/xhr"

], function (Url, when, Deferred, array, declare, lang, all, xhr) {
// module:
//		gform/util/Resolver


	return declare("gform.Resolver", [], {
		// summary:
		//		Resolver helps resolving references.
		constructor: function (kwArgs) {
			this.transformations = {};
			this.references = [];
			this.values = {};
			if (kwArgs && kwArgs.baseUrl && kwArgs.transformations) {
				var rebasedTrans = {};
				for (var key in kwArgs.transformations) {
					var rebasedUrl = new Url(kwArgs.baseUrl, key).uri;
					var t = {};
					lang.mixin(t, kwArgs.transformations[key]);
					var newUrl = new Url(kwArgs.baseUrl, kwArgs.transformations[key].url).uri;
					t.url = newUrl;
					rebasedTrans[rebasedUrl] = t;
				}
				kwArgs.transformations = rebasedTrans;
			}
			lang.mixin(this, kwArgs);

		},
		transformations: null,
		baseUrl: "",
		values: null,
		references: null,
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
		getUrlForRef: function (relUrl, baseUrl) {
			return new Url(baseUrl, relUrl).uri;
		},
		finish: function (references, baseUrl) {
			// summary:
			//		external unloaded references are loaded.
			// returns: dojo/Promise
			//		returns a promise
			var deferred = [];
			array.forEach(references, function (ref) {
				if (typeof value === "undefined") {
					if (ref.id.substring(0, 1) === "#") {
						throw new Error("path reference not implemented");
					} else {
						if (!this.values[ref.id]) {
							deferred.push(this.load(ref, baseUrl));
						}
					}
				}
				this.references.push(ref);
			}, this);
			return all(deferred);
		},
		createSetter: function (obj, name) {
			return  (function (obj1, name1) {
				return    function (value) {
					obj1[name1] = value;
				};
			})(obj, name);
		},
		resolveInternally: function (obj, setter, baseUrl) {
			// summary:
			//		resolve a single property value
			// setter:
			//		if this is a ref then setter needs to be called with the resolved value
			var references = [];
			if (lang.isObject(obj) || lang.isArray(obj)) {
				for (var name in obj) {
					if (obj.hasOwnProperty(name)) {
						if (name === "$ref") {
							var url = this.getUrlForRef(obj.$ref, baseUrl);
							references.push(this.createReference(url, setter));
							break;
						} else if (name === "id") {
							this.addElement(obj);
						} else {
							var newSetter = this.createSetter(obj, name);
							references = references.concat(this.resolveInternally(obj[name], newSetter, baseUrl));
						}
					}
				}
			}
			return references;
		},
		callSetters: function () {
			// TODO we should call transforms last
			var me = this;
			var ts = this.references.sort(function (e1, e2) {
				var t1 = me.transformations[e1.id];
				var t2 = me.transformations[e2.id];
				if (t1 == null && t2 != null) {
					return -1;
				} else if (t1 != null && t2 == null) {
					return 1;
				} else if (e1.id === e2.id) {
					return 0;
				} else {
					return  me.references.indexOf(e2) - me.references.indexOf(e1);
				}

			});
			ts.forEach(function (ref) {
				when(this.values[ref.id]).then(lang.hitch(this, "callSetter", ref));
			}, this);
		},
		callSetter: function (ref, value) {
			var t = this.transformations[ref.id];
			console.log("call setter " + ref.id + " with " + t);
			if (t) {
				value = t.execute(value);
			}
			ref.setter(value);
		},
		resolveMore: function (obj, baseUrl) {
			baseUrl = baseUrl || this.baseUrl;
			var references = this.resolveInternally(obj, null, baseUrl);
			return this.finish(references, baseUrl);
		},
		resolve: function (object, baseUrl) {
			this.values[baseUrl] = object;
			var promise = this.resolveMore(object, baseUrl);
			promise.then(lang.hitch(this, "callSetters"));
			return promise;
		},
		load: function (/*String*/ref, baseUrl) {
			// summary:
			//		load an external reference
			// ref:
			//		the reference value


			var id = ref.id;

			var url = id;//new Url(baseUrl, id).uri;

			if (this.values[url]) {
				throw new Error("already loading");
			}
			var originalUrl = url;

			var t = this.transformations[url];
			if (t) {
				url = t.url;
			}

			var index = url.lastIndexOf("/");
			var newBaseUrl;
			if (index >= 0) {
				newBaseUrl = url.substring(0, url.lastIndexOf("/") + 1);

			} else {
				newBaseUrl = baseUrl;

			}


			var deferred = new Deferred();
			var request = this._load(url);
			console.debug("loading " + originalUrl);
			request.then(lang.hitch(this, "onLoaded", newBaseUrl, deferred)).otherwise(
				function (e) {
					console.debug("reject " + url, e);
					deferred.reject();
				});


			this.values[originalUrl] = deferred.promise;
			return deferred.promise;
		},
		_load: function (url) {
			return xhr(url, {handleAs: "json", method: "GET"});
		},
		onLoaded: function (newBaseUrl, deferred, resolvedRef) {

//			if (t) {
//				var transformPromise = new Deferred();
//				me.values[originalUrl] = transformPromise;
//			} else {
//				embedded.id = originalUrl;
//				ref.setter(embedded);
//				me.values[originalUrl] = embedded;
//			}
			var dependentPromise = this.resolveMore(resolvedRef, newBaseUrl);
			when(dependentPromise).then(function () {
//				if (t) {
//					var transformed = t.execute(embedded);
//					transformed.id = originalUrl;
//					ref.setter(transformed);
//					transformPromise.resolve(transformed);
//
//					when(me.resolve(transformed, null, newBaseUrl)).then(function () {
//						deferred.resolve(transformed);
//					});
//				} else {
				deferred.resolve(resolvedRef);
//				}
			}).otherwise(function (e) {
					console.debug("rejected dependent ", e);
					deferred.reject();
				}
			)
			;

		}

	});

});
