define([
    'dojo/_base/declare'
], function (declare) {

    return declare([], {
        props: ["label", "code", "editorDescription", "additionalProperties"],
        "in": function (value) {
            var attributes = [];
            var group = {};
            this.visitIn(value, attributes, group);
            if (Object.keys(group).length == 0) {
                group = {editor: "listpane", attributes: []}
            }
            var inValue = {};
            inValue.group = group;
            inValue.attributes = attributes;
            this.props.forEach(function (prop) {
                inValue[prop] = inValue.group[prop];
                delete inValue.group[prop];
            });
            return inValue;
        },
        out: function (value) {
            var form = this.visitOut(value.group, value.attributes);
            this.props.forEach(function (prop) {
                form[prop] = value[prop];
                delete value[prop];
            });
            return form;
        },
        visitOut: function (group, attributes) {
            var form = {};
            //lang.mixin(form, group);
            if (!group) {
                return null;
            } else if ("attribute" in group) {
                var code = group.attribute;
                form.attribute = attributes.filter(function (attribute) {
                    return attribute && attribute.code === code;
                })[0];
                this.copyGroupProperties(group, form, "attribute");
            } else if ("attributes" in group) {
                var codes = group.attributes;
                var newAttributes = codes.map(function (code) {
                    return attributes.filter(function (a) {
                        return a && a.code === code;
                    })[0];
                });
                form.attributes = newAttributes;
                this.copyGroupProperties(group, form, "attributes");
            } else if ("group" in group) {
                form.group = this.visitOut(group.group, attributes);
                this.copyGroupProperties(group, form, "group");
            } else if ("groups" in group) {
                form.groups = [];
                group.groups.forEach(function (group) {
                    var newGroup = this.visitOut(group, attributes);
                    form.groups.push(newGroup);
                }, this);
                this.copyGroupProperties(group, form, "groups");
            } else if (group.editor === "tree") {
                form.detailGroup = this.visitOut(group.detailGroup, attributes);
                var codes = group.nodeAttributes;
                var newAttributes = codes.map(function (code) {
                    return attributes.filter(function (a) {
                        return a && a.code === code;
                    })[0];
                });
                form.nodeAttributes = newAttributes;
                this.copyGroupProperties(group, form, ["detailGroup", "nodeAttributes"]);
            }
            return form;
        },
        copyGroupProperties: function (from, to, exclude) {
            if (!to || !from) {
                // TODO this situation exists during first update. Need to remove the bubbling during first update.
                return;
            }
            Object.keys(from).forEach(function (key) {
                if (from[key] && key !== exclude && (!exclude.indexOf || exclude.indexOf(key) < 0)) {
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
                this.copyGroupProperties(value, group, "attribute");
            } else if ("attributes" in value) {
                value.attributes.forEach(function (attribute) {
                    attributes.push(attribute);
                });
                var aCodes = value.attributes.map(function (attribute) {
                    return attribute.code;
                }, this);
                group.attributes = aCodes;
                this.copyGroupProperties(value, group, "attributes");
            } else if ("group" in value) {
                group.group = {};
                this.copyGroupProperties(value, group, "group");
                this.visitIn(value.group, attributes, group.group);
            } else if ("groups" in value) {
                group.groups = [];
                this.copyGroupProperties(value, group, "groups");
                value.groups.forEach(function (element) {
                    var newGroup = {};
                    group.groups.push(newGroup);
                    this.visitIn(element, attributes, newGroup);
                }, this);
            } else if (value.editor === "tree") {
                group.detailGroup = {};
                this.copyGroupProperties(value, group, ["detailGroup", "nodeAttributes"]);
                this.visitIn(value.detailGroup, attributes, group.detailGroup);

                value.nodeAttributes.forEach(function (attribute) {
                    attributes.push(attribute);
                });
                var aCodes = value.nodeAttributes.map(function (attribute) {
                    return attribute.code;
                }, this);
                group.nodeAttributes = aCodes;
            }
        }
    });
});
