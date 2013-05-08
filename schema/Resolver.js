define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare","dojo/promise/all", "dojo/request/xhr"
		 ], function(array, lang,
		declare, all, request) {


	return declare("gform.Resolver",[],{
			constructor: function(kwargs) {
				lang.mixin(this,kwargs);
			},
			baseUrl:null,
			references:[],
			values:{},
			addReference: function(id,setter) {
				if (id) {
					this.references.push({id:id,setter:setter});
				}
			},
			addElement: function(element) {
				if (element.id) {
					this.values[element.id]=element;
				}
			},
			finish:function() {
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
			load: function(ref) {
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
							console.log("cannot find schema "+ref.id+" "+e.message);
						}
				);
				return deferred;
			}

	});
	
});
