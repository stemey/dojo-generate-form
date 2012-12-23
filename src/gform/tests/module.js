dojo.provide("gform.tests.module");


try {
	doh.registerUrl("gform.tests.Editor", dojo.moduleUrl("gform","tests/test_embedded_list.html"));
	doh.registerUrl("gform.tests.Editor", dojo.moduleUrl("gform","tests/test_embedded_polymorphic.html"));
}catch(e){
	doh.debug(e);
}