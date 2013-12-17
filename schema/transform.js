define([    'dojo/_base/lang'], function (lang) {
// module:
//		gform/Meta

	var t = {};
	var removeFirstGroupFromAttributes = function (attributes) {
		var newArray = [];
		attributes.forEach(function (e) {
			if (e.code && !e.code.match(/(object|array|map)/)) {
				var newE = {};
				lang.mixin(newE, e);
				var newGroups = [];
				e.groups.forEach(function (group, idx) {
					if (idx > 0) {
						newGroups.push(group);
					}
				});
				newE.groups = newGroups;
				newArray.push(newE);
			}
		});
		return newArray;
	};
	var removeCode = function (groups) {
		var newArray = [];
		groups.forEach(function (e) {
			var newE = {};
			lang.mixin(newE, e);
			var newAttributes = [];
			e.attributes.forEach(function (group, idx) {
				if (group.code !== "code") {
					newAttributes.push(group);
				}
			});
			newE.attributes = newAttributes;
			newArray.push(newE);
		});
		return newArray;
	};
	var removeCodeAndLabel = function (groups) {
		var newArray = [];
		groups.forEach(function (e) {
			var newE = {};
			lang.mixin(newE, e);
			var newAttributes = [];
			e.attributes.forEach(function (group, idx) {
				if (group.code !== "code" && group.code !== "label") {
					newAttributes.push(group);
				}
			});
			newE.attributes = newAttributes;
			newArray.push(newE);
		});
		return newArray;
	};
	t["/source/gform/schema/attributes-nocode.json"] = {url: "/source/gform/schema/attributes.json", execute: removeFirstGroupFromAttributes};
	t["/source/gform/schema/group/groups-nocode.json"] = {url: "/source/gform/schema/group/groups.json", execute: removeCodeAndLabel};
	t["/source/gform/schema/group/groups-nocode-nolabel.json"] = {url: "/source/gform/schema/group/groups.json", execute: removeCodeAndLabel};
	return t;

});