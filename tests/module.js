dojo.provide("gform.tests.module");


try {
	doh.registerUrl("gform.tests.embedded_list", dojo.moduleUrl("gform","tests/test_embedded_list.html")); 
	doh.registerUrl("gform.tests.embedded_list_polymorphic", dojo.moduleUrl("gform","tests/test_embedded_list_polymorphic.html"));
	doh.registerUrl("gform.tests.embedded", dojo.moduleUrl("gform","tests/test_embedded.html"));
	doh.registerUrl("gform.tests.embedded_polymorphic", dojo.moduleUrl("gform","tests/test_embedded_polymorphic.html"));
	doh.registerUrl("gform.tests.primitive_int", dojo.moduleUrl("gform","tests/test_primitive_number.html"));
	doh.registerUrl("gform.tests.primitive_boolean", dojo.moduleUrl("gform","tests/test_primitive_boolean.html"));
	doh.registerUrl("gform.tests.primitive_select", dojo.moduleUrl("gform","tests/test_primitive_select.html"));
	doh.registerUrl("gform.tests.primitive_list", dojo.moduleUrl("gform","tests/test_primitive_list.html"));
	doh.registerUrl("gform.tests.primitive_list_select", dojo.moduleUrl("gform","tests/test_primitive_list_select.html"));
	doh.registerUrl("gform.tests.group_tab", dojo.moduleUrl("gform","tests/test_group_tab.html"));
}catch(e){
	doh.debug(e);
}
