// this profile builds a gform release including tests and docs
dependencies = {
	action:"release",
	optimize:"shrinksafe",
	stripConsole: "normal",
	cssOptimize: "comments",
	layers: [{
		name: "gform.js",
		dependencies: [
			"gform/createStandardEditorFactory",
			"gform/createLayoutEditorFactory",
			"gform/Editor",
		]}
	],
	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "gform", "../gform" ],
		[ "gridx", "../gridx" ],
	]
}
