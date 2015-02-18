define([
    "../../model/AbstractMappedSelectModel",
    "dojo/_base/declare",
    "./GroupTransformer",
    "dojo/_base/lang"
], function (AbstractMappedSelectModel, declare, GroupTransformer, lang) {

    return declare("gform.model.AttributeSelectModel", [AbstractMappedSelectModel], {
        form: null,
        transformer: null,
        constructor: function () {
            this.transformer = new GroupTransformer();
        },
        startListening: function (parent, cb) {
            // make sure it is not the window
            while (parent && !parent.form && !parent.location) {
                parent = parent.parent;
            }
            this.form = parent;

            parent.watch("attributesSelectModel", lang.hitch(this,"_onMappedAttributeChanged"));
            this._onMappedAttributeChanged();
        },
        getMappedValues: function () {
            return this.form.get("attributesSelectModel");
        },
		_onMappedAttributeChanged: function () {
			// TODO because of performance at initialization time we don't validate here. Need to distinguish initial update and changes?
			this._initOptions();
		}
    });
});
