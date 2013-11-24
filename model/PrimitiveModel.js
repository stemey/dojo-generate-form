define([
	"dojo/_base/declare",
	"./MetaModel"
], function (declare, MetaModel) {
	// module: 
	//		gform/model/PrimitiveModel

	return declare([MetaModel], {
		// summary:
		//		Provides access to sibling attributes of modelHandle.
		value: null,
		oldValue: null,
		update: function (/*Object*/plainValue, bubble) {
			// summary:
			//		update the attribute with the given plainValue. Attribute has a single valid type.
			// plainValue:
			//		the new value of the attribute
			this._execute(function () {
				if (typeof plainValue === "undefined") {
					this.set("value", null);
				} else {
					this.set("value", plainValue);
				}
				this.set("oldValue", this.value);
				this.computeProperties();
			}, bubble);

			if (this.parent && bubble !== false) {
				this.parent.onChange();
			}

		},
		onChangeXX: function (validate) {
			var me = this;
			var a = arguments;
			setTimeout(function () {
				me.inherited(a);
			}, 0);
		},
		visit: function (cb, idx) {
			cb(this, function () {
			}, idx);
		},
		addErrorKK: function () {
			var me = this;
			var a = arguments;
			setTimeout(function () {
				me.inherited(a);
			}, 0);
		},
		getPlainValue: function () {
			return this.value;
		},
		iterateChildren: function (cb) {
		}


	});
});
