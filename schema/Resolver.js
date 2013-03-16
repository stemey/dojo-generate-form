define([ "dojo/_base/array", "dojo/_base/lang", "dojo/_base/declare",
		 ], function(array, lang,
		declare) {


	return declare("gform.Resolver",null,{
			references:[],
			values:{},
			addReference: function(id,setter) {
				this.references.push({id:id,setter:setter});
			},
			addElement: function(element) {
				this.values[element.id]=element;
			},
			finish:function() {
				array.forEach(this.references,function(ref) {
					var value = this.values[ref.id];
					if (typeof value == "undefined") {
						throw new Error("cannot find value for "+ref.id);
					} else {
						ref.setter(value);
					}
				},this);
			}

	});
	
});
