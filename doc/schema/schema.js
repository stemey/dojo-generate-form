define([
	"dojo/_base/declare"//
], function (declare) {

	var remove = function (e) {
		return undefined;
	};

	return declare([], {
		promises: [],
		attributeTransform: {
			"group": function (e) {
				return {code: "group", type: "group", description: e.description};
			},
			"type": remove
		},
		prepare: function (attributes) {
			var mapped = [];
			attributes.forEach(function (e) {
				var r = this.transformAttribute(e);
				if (r != null) {
					mapped.push(r);
				}
			}, this);
			return mapped;
		},
		transformAttribute: function (attribute) {
			var a = {};
			a.id = attribute.code;
			a.description = attribute.description;
			a.example = dojo.toJson(attribute.example, true);
			a.props = [];
			if (attribute.attributes) {
				a.props = this.transformAttributes(attribute.attributes);
			} else if (attribute.groups) {
				a.props = this.transformGroups(attribute.groups);
			} else if (attribute.group) {
				a.props = this.transformGroup(attribute.group);
			}
			return a;

		},
		transformGroups: function (groups) {
			var props = [];
			groups.forEach(function (group) {
				props = props.concat(this.transformGroup(group));
			}, this);
			return props;
		},
		transformGroup: function (group) {
			if (group.groups) {
				return this.transformGroups(group.groups);
			} else if (group.attributes) {
				return this.transformAttributes(group.attributes);
			} else {
				return [];
			}
		},
		transformAttributes: function (attributes) {
			var props = [];
			attributes.forEach(function (e) {
				var t = this.attributeTransform[e.code];
				var r;
				if (t == null) {

					props.push(e);
				}
				else {
					r = t(e);
					if (r) {
						props.push(r);
					}
				}
			}, this);
			return props;
		}

	});
});