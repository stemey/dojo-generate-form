// this profile builds a gform release including tests and docs
dependencies = {
	action:"release",
	optimize:"shrinksafe",
	stripConsole: "normal",
	cssOptimize: "comments",
	copyTests: "build",
	layers: [{
		name: "gform.js",
		dependencies: [
			"gform/createStandardEditorFactory",
			"gform/createLayoutEditorFactory",
			"doh/runner"
		]}
	],
	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "doh", "../util/doh" ],
		[ "gform", "../gform" ],
		[ "gridx", "../gridx" ],
		[ "json-schema", "../json-schema" ]
	]
}
