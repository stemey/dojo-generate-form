define(['dojo/_base/lang',
	'dojo/_base/declare',
], function (lang, declare) {

    return declare([], {
        in: function (value) {
            var attributes = [];
            this.visitIn(attributes, value);
			var inValue = {};
            inValue.group = value;
			inValue.attributes = attributes;
			if (value && value.additionalProperties) {
				inValue.additionalProperties = value.additionalProperties;
			}
			return inValue;
        },
        out: function (value) {
            var form = value.group;
            this.visitOut(value.attributes, form);
			if (value && value.additionalProperties) {
				form.additionalProperties = value.additionalProperties;
			}
			return form;
        },
        visitOut: function (attributes, group) {
            if (!group) {
                return null;
            } else if ("attribute" in group) {
                var code = group.attribute;
                group.attribute = attributes.filter(function (attribute) {
                    return attribute.code === code;
                })[0];
            } else if ("attributes" in group) {
                var codes = group.attributes;
                var newAttributes = codes.map(function (code) {
                    return attributes.filter(function(a) {return a.code===code;})[0];
                });
                group.attributes=newAttributes;
            } else if ("group" in group) {
                this.visitOut(attributes, group.group);
            } else if ("groups" in group) {
                group.groups.forEach(function (group) {
                    this.visitOut(attributes, group);
                }, this);
            }
        },
        visitIn: function (attributes, value) {
            if (!value) {
               // console.log("nix");
            }else if ("attribute" in value) {
                attributes.push(value.attribute);
                value.attribute = value.attribute.code;
            } else if ("attributes" in value) {
                value.attributes.forEach(function (attribute) {
                    attributes.push(attribute);
                });
                var aCodes = value.attributes.map(function (attribute) {
                    return attribute.code;
                }, this);
                value.attributes = aCodes;
            } else if ("group" in value) {
                this.visitIn(attributes, value.group);
            } else if ("groups" in value) {
                value.groups.forEach(function (group) {
                    this.visitIn(attributes, group);
                }, this);
            }
        }
    });
});
