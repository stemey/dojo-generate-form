define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare","dojo/promise/all", "dojo/request/xhr"
		 ], function(array, lang,
		declare, all, request) {
// module:
//		gform/schema/Resolver


	return declare("gform.Resolver",[],{
		// summary: 
		//		Resolver helps resolving references.
			constructor: function(kwargs) {
				lang.mixin(this,kwargs);
			},
			baseUrl:"",
			references:[],
			values:{},
			addReference: function(id,setter) {
			// summary:
			//		a reference is added
			// id:
			//		the value of the reference
			// setter:
			//		function to be called when ref is resolved.
				if (id) {
					this.references.push({id:id,setter:setter});
				}
			},
			addElement: function(element) {
			// summary:
			//		an element with an id was found
			// element:
			//		the element with id
				if (element.id) {
					this.values[element.id]=element;
				}
			},
			finish:function() {
			// summary:
			//		resolve references (asynchronuously) and updates the object.
			// returns: dojo/Promise
			//		returns a promise		
				var deferred =[];
				array.forEach(this.references,function(ref) {
					var value = this.values[ref.id];
					if (typeof value == "undefined") {
						if (ref.id.substring(0,1)=="#") {
							throw new Error("path reference not implemented");
						}else{
							deferred.push(this.load(ref));
						}
					} else {
						ref.setter(value);
					}
				},this);
				return all(deferred);
			},
			load: function(/*String*/ref) {
			// summary:
			//		load an external reference
			// ref:
			//		the reference value
				if (ref.id.substring(0,1)=="/") {
					var url=ref.id;
				}else	if (ref.id.substring(0,2)=="./") {
					var url=this.baseUrl+ref.id.substring(2);
				}else{
					var url=this.baseUrl+ref.id;
				}
				var deferred = request(url,{handleAs:"json",method:"GET"});
				deferred.then(
						function(schema){
							schema.id=ref.id;
							ref.setter(schema)
						},
						function(e) {
							console.log("cannot find entity "+ref.id+" "+e.message);
						}
				);
				return deferred;
			}

	});
	
});
