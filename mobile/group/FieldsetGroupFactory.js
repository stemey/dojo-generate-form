define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"../../group/GroupFactory",//
"dojox/mobile/EdgeToEdgeList",

], function(array, lang, declare, GroupFactory,   EdgeToEdgeList) {

	return declare([GroupFactory], {
		createWidget : function(group) {
			var pane = new EdgeToEdgeList();
			return pane;
	}
	})
});
