// this profile builds a gform release including tests and docs
dependencies = {
	action:"release",
	optimize:"shrinksafe",
	stripConsole: "normal",
	cssOptimize: "comments",
	layers: [
		{
		name: "gform-layout.js",
		dependencies: [
			"gform/createStandardEditorFactory",
			"gform/createLayoutEditorFactory",
			"gform/Editor",
		]},
		{
		name: "gform-mobile.js",
		dependencies: [
			"gform/mobile/createMobileEditorFactory",
			"gform/Editor",
		]},
	],
	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "gform", "../gform" ],
		[ "gridx", "../gridx" ],
	]
}
