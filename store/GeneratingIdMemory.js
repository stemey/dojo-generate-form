define(["dojo/_base/declare", "dojo/store/Memory" ],
	function (declare, Memory) {

		var currentId = 1000;

		return declare([Memory], {
			add: function (object, options) {
				if (!object[this.idProperty]) {
					currentId += 1;
					object[this.idProperty] = currentId;
				}
				return this.inherited(arguments);
			},
            query: function(query, options) {
                if (typeof query === "object") {
                    var newQuery = {};
                    Object.keys(query).forEach(function(key) {
                        var criterion= query[key];
                        if (typeof criterion === "object") {
                            if (criterion.$in) {
                                newQuery[key] ={test:function(value) {
                                    return criterion.$in.indexOf(value)>-1;
                                }};
                            }
                        } else {
                            newQuery[key]=criterion;
                        }
                    }, this);
                    return this.inherited(arguments,[newQuery,options]);
                }else {
                    return this.inherited(arguments);
                }
            }
		});

	});
