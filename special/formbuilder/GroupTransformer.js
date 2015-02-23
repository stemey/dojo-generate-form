define([
	'dojo/_base/declare',
	'dojo/_base/lang'
], function (declare, lang) {

	return declare([], {
		in: function (value) {
			var attributes = [];
			var group = {};
			this.visitIn(value, attributes, group);
			var inValue = {};
			inValue.group = group;
			inValue.attributes = attributes;
			this.copyGroupProperties(value, inValue);
			return inValue;
		},
		out: function (value) {
			var form = this.visitOut(value.group, value.attributes);
			this.copyGroupProperties(value, form);
			return form;
		},
		visitOut: function (group, attributes) {
			var form = {};
			lang.mixin(form, group);
			if (!group) {
				return null;
			} else if ("attribute" in group) {
				var code = group.attribute;
				form.attribute = attributes.filter(function (attribute) {
					return attribute && attribute.code === code;
				})[0];
			} else if ("attributes" in group) {
				var codes = group.attributes;
				var newAttributes = codes.map(function (code) {
					return attributes.filter(function (a) {
						return a && a.code === code;
					})[0];
				});
				form.attributes = newAttributes;
			} else if ("group" in group) {
				form.group = this.visitOut(group.group, attributes);
			} else if ("groups" in group) {
				form.groups=[];
				group.groups.forEach(function (group) {
					var newGroup=this.visitOut(group, attributes);
					form.groups.push(newGroup);
				}, this);
			}
			return form;
		},
		copyGroupProperties: function (from, to) {
			if (!to || !from) {
				// TODO this situation exists during first update. Need to remove the bubbling during first update.
				return;
			}
			Object.keys(from).forEach(function (key) {
				if (from[key] && ["additionalProperties", "label", "code", "description"].indexOf(key) >= 0) {
					to[key] = from[key];
				}
			});
		},
		visitIn: function (value, attributes, group) {
			if (!value) {
				// console.log("nix");
			} else if ("attribute" in value) {
				attributes.push(value.attribute);
				group.attribute = value.attribute.code;
			} else if ("attributes" in value) {
				value.attributes.forEach(function (attribute) {
					attributes.push(attribute);
				});
				var aCodes = value.attributes.map(function (attribute) {
					return attribute.code;
				}, this);
				group.attributes = aCodes;
			} else if ("group" in value) {
				group.group = {};
				this.visitIn(value.group, attributes, group.group);
			} else if ("groups" in value) {
				group.groups = [];
				value.groups.forEach(function (element) {
					var newGroup = {};
					group.groups.push(newGroup);
					this.visitIn(element, attributes, newGroup);
				}, this);
			}
		}
	});
});
