define(['dijit/layout/_LayoutWidget',
	"dojo/_base/lang",
	"dojo/_base/declare",
	"./ace"
], function (LayoutWidget, lang, declare, ace) {


	var delegatedProps = {
		"value": {setter: "setValue", getter: "getValue"}
	};
	var delegatedSessionProps = {
		"mode": {setter: "setMode", getter: "getMode"}

	};


	return declare("gform.ace.AceEditor", [LayoutWidget],
		{
			postCreate: function () {
				var conf = {};
				Object.keys(delegatedProps).forEach(function (key) {
					conf[key] = this.get(key);
				}, this);
				var sessionConf = {};
				Object.keys(delegatedSessionProps).forEach(function (key) {
					sessionConf[key] = this.get(key);
				}, this);

				this.ace = ace.edit(this.domNode);

				if (this.options) {
					this.ace.setOptions(this.options);
				}

				Object.keys(delegatedProps).forEach(function (key) {
					this.set(key, conf[key]);
				}, this);
				Object.keys(delegatedSessionProps).forEach(function (key) {
					this.set(key, sessionConf[key]);
				}, this);

				this.ace.on("blur", lang.hitch(this, "onBlur"));
				this.ace.on("changeAnnotation", lang.hitch(this, "onChangeAnnotation"));
			},
			onChangeAnnotation: function () {
				// this.set("state", this.ace.getSession().getAnnotations().length > 0 ? "Error":"")   ;

			},
			_set: function (prop, value) {
                if (this.ace && prop === "value") {
                    this.ace.setValue(value,-1);
                } else if (this.ace && prop in delegatedProps) {
					this.ace[delegatedProps[prop].setter](value);
				} else if (this.ace && prop in delegatedSessionProps) {
					this.ace.getSession()[delegatedSessionProps[prop].setter](value);
				}
				// always fire event
				this.inherited(arguments);
			},
			_get: function (prop) {
				if (this.ace && prop in delegatedProps) {
					return this.ace[delegatedProps[prop].getter]();
				} else {
					return this.inherited(arguments);
				}
			},
			resize: function () {
				var ret = this.inherited(arguments);
				if (this.ace && this.ace.renderer) {
					this.ace.renderer.onResize();
				}
				return ret;
			},
			onBlur: function () {
				this.set("value", this.ace.getValue());
				// this is done aysnchronuously
				//this.set("state", this.ace.getSession().getAnnotations().length > 0 ? "Error":"")   ;
			},
			destroy: function () {
				this.inherited(arguments);
				this.ace.session.$stopWorker();
				this.ace.destroy();
			}
		});
});
