dojo.provide("gform.tests.module");


try {
	doh.registerUrl("gform.tests.embedded_list", dojo.moduleUrl("gform","tests/test_embedded_list.html")); 
	doh.registerUrl("gform.tests.embedded_list_polymorphic", dojo.moduleUrl("gform","tests/test_embedded_list_polymorphic.html"));
	doh.registerUrl("gform.tests.embedded", dojo.moduleUrl("gform","tests/test_embedded.html"));
	doh.registerUrl("gform.tests.embedded_polymorphic", dojo.moduleUrl("gform","tests/test_embedded_polymorphic.html"));
}catch(e){
	doh.debug(e);
}
