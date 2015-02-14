define([
	'dojo/_base/declare'
], function (declare) {

	return declare([], {
		in: function (value) {
			var attributes = [];
			var group = {};
			this.visitIn(value, attributes, group);
			var inValue = {};
			inValue.group = group;
			inValue.attributes = attributes;
			this.copyGroupProperties(value,inValue);
			return inValue;
		},
		out: function (value) {
			var form = value.group;
			this.visitOut(value.attributes, form);
			this.copyGroupProperties(value,form);
			return form;
		},
		visitOut: function (attributes, group) {
			if (!group) {
				return null;
			} else if ("attribute" in group) {
				var code = group.attribute;
				group.attribute = attributes.filter(function (attribute) {
					return attribute && attribute.code === code;
				})[0];
			} else if ("attributes" in group) {
				var codes = group.attributes;
				var newAttributes = codes.map(function (code) {
					return attributes.filter(function (a) {
						return a && a.code === code;
					})[0];
				});
				group.attributes = newAttributes;
			} else if ("group" in group) {
				this.visitOut(attributes, group.group);
			} else if ("groups" in group) {
				group.groups.forEach(function (group) {
					this.visitOut(attributes, group);
				}, this);
			}
		},
		copyGroupProperties: function (from, to) {
			Object.keys(from).forEach(function (key) {
				if (["additionalProperties","label", "code", "description"].indexOf(key) >= 0) {
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
