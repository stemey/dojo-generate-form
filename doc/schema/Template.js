define(["dojo/_base/declare"//
], function (declare) {

	return declare("gform.doc.Template", [], {
		constructor: function (templateString) {
			this.compile(templateString);
		},
		render: function (context) {
			return this.renderFunction(context);
		},
		compile: function (str) {
			// Generate a reusable function that will serve as a template
			// generator (and which will be cached).
			var x = "var p=[],print=function(){p.push.apply(p,arguments);};";
			// Introduce the data as local variables using with(){}
			x += "with(obj){p.push('";
			// Convert the template into pure JavaScript
			x +=
				str.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'");
			x += "');}return p.join('');";
			this.renderFunction = new Function("obj", x);
		}


	});
});
