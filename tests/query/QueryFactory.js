define([
	'dojo/_base/lang',
	'dojo/_base/declare',
	"doh/runner", "../../list_primitive/QueryFactory"], function (lang, declare, doh, QueryFactory) {



	var Ctx = declare(null,{
		constructor: function(value) {
			this.value=value;
		},
		getValue: function() {
			return this.value;
		}
	})

	doh.register("QueryFactory", [
		function testSimpleProp() {

			var qf = new QueryFactory({ctx:new Ctx( {x:"hallo"})});
			var evalCtx = qf._createCtx();
			doh.assertEqual("hallo", evalCtx.getValue("x"));
		},
		function testElementProp() {

			var qf = new QueryFactory({ctx:new Ctx( {x:["hallo","bye"]})});
			var evalCtx = qf._createCtx();
			doh.assertEqual("bye", evalCtx.getValue("x.1"));
		},
		function testEval() {

			var qf = new QueryFactory({attribute:{query:{script:"this.getValue('x.1');"}},ctx:new Ctx( {x:["hallo","bye"]})});
			var query = qf.create();
			doh.assertEqual("bye", query);
		}
	]);


});

