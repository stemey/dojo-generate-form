define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/json",//
"dojo/_base/declare",//
], function(array, lang, json,declare) {

	return declare("gform.doc.Template", [],{
		constructor : function(kwArgs) {
			lang.mixin(this, kwArgs);
			this.compile();
		},
		render : function(context) {
			return renderFunction(context);
		},
		compile : function() {
			// Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      this.renderFunction= new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
	}
	 
		
	})
});
