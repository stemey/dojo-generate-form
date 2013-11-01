define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/Stateful",//
"../patch/StatefulArray",//
"./MetaModel",//
"./enhanceArray"
], function(array, lang, declare, Stateful, StatefulArray, MetaModel, enhanceArray) {
	// module: 
	//		gform/model/SingleObject

	return declare([MetaModel], {
	// summary:
	//		Provides access to sibling attributes of modelHandle.
		value:new StatefulArray([]),
		elementFactory:null,
		constructor: function(kwArgs) {
				lang.mixin(this, kwArgs);
		},
		push: function(value) {
			this.value.push(this.elementFactory(value));
		},
		getModelByIndex: function(idx) {
			return this.value[idx];
		},
		update: function(/*Object*/plainValue) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute
			enhanceArray(this);

			if (plainValue==null) {
				this.value.splice(0,this.value.length);
				this.set("oldValue",[]);
			}else	if (typeof plainValue== "undefined"	) {
				this.value.splice(0,this.value.length);
				this.set("oldValue",[]);
			}else if (Array.isArray(plainValue)) {
				var removeCount= plainValue.length - this.value.length;
				if (removeCount>0) {	
					this.value.splice(0, removeCount);
				}
				plainValue.forEach(function(element,i) {
					var model=this.value[i];
					if (model==null) {
						model = this.elementFactory(element);
						this.value.push(model);
					}else {
						this.resetMeta(model);
						model.update(element);
					}
				},this);
				this.set("oldValue",this.getPlainValue());
			}
		},
		iterateChildren: function(cb) {
			this.value.forEach(function (model, index) {
				cb.call(this, model);
			}, this);
		},
		getPlainValue: function() {
			var plainValue=[];
			this.value.forEach(function(model) {
				plainValue.push(model.getPlainValue());
			}, this);
			return plainValue;
		},
		getPath: function(path) {
			throw new Error("not implemented yet");
		}
	})
});
