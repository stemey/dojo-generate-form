define ("gform.tests.module",[
"gform/tests/getPlainValue",//
"gform/tests/updateModelHandle",//
"gform/tests/refresolve",//
"gform/tests/convertSchema",//
"gform/tests/schemaGenerator",//
"gform/tests/visit",//
"gform/tests/equals",//
"gform/tests/restHelper"
],function() {

	try {
		doh.registerUrl("gform.tests.embedded_list", dojo.moduleUrl("gform","tests/test_embedded_list.html")); 
		doh.registerUrl("gform.tests.embedded_map", dojo.moduleUrl("gform","tests/test_embedded_map.html")); 
		doh.registerUrl("gform.tests.primitive_map", dojo.moduleUrl("gform","tests/test_primitive_map.html")); 
		doh.registerUrl("gform.tests.embedded_list_polymorphic", dojo.moduleUrl("gform","tests/test_embedded_list_polymorphic.html"));
		doh.registerUrl("gform.tests.tab_list_polymorphic", dojo.moduleUrl("gform","tests/test_tab_list_polymorphic.html"));
		doh.registerUrl("gform.tests.tab_list", dojo.moduleUrl("gform","tests/test_tab_list.html"));
		doh.registerUrl("gform.tests.titlepanes", dojo.moduleUrl("gform","tests/test_titlepanes.html"));
		doh.registerUrl("gform.tests.embedded", dojo.moduleUrl("gform","tests/test_embedded.html"));
		doh.registerUrl("gform.tests.embedded_polymorphic", dojo.moduleUrl("gform","tests/test_embedded_polymorphic.html"));
		doh.registerUrl("gform.tests.primitive_int", dojo.moduleUrl("gform","tests/test_primitive_number.html"));
		doh.registerUrl("gform.tests.primitive_currencyamount", dojo.moduleUrl("gform","tests/test_primitive_currencyamount.html"));
		doh.registerUrl("gform.tests.primitive_boolean", dojo.moduleUrl("gform","tests/test_primitive_boolean.html"));
		doh.registerUrl("gform.tests.primitive_date", dojo.moduleUrl("gform","tests/test_primitive_date.html"));
		doh.registerUrl("gform.tests.primitive_time", dojo.moduleUrl("gform","tests/test_primitive_time.html"));
		doh.registerUrl("gform.tests.primitive_string", dojo.moduleUrl("gform","tests/test_primitive_string.html"));
		doh.registerUrl("gform.tests.primitive_textarea", dojo.moduleUrl("gform","tests/test_primitive_textarea.html"));
		doh.registerUrl("gform.tests.primitive_select", dojo.moduleUrl("gform","tests/test_primitive_select.html"));
		doh.registerUrl("gform.tests.primitive_ref", dojo.moduleUrl("gform","tests/test_primitive_ref.html"));
		doh.registerUrl("gform.tests.primitive_ref_in_tab", dojo.moduleUrl("gform","tests/test_primitive_ref_in_tab.html"));
		doh.registerUrl("gform.tests.primitive_ref_in_dialog", dojo.moduleUrl("gform","tests/test_primitive_ref_in_dialog.html"));
		doh.registerUrl("gform.tests.crudController", dojo.moduleUrl("gform","tests/test_crudController.html"));
		doh.registerUrl("gform.tests.primitive_checkedselect", dojo.moduleUrl("gform","tests/test_primitive_checkedselect.html"));
		doh.registerUrl("gform.tests.primitive_mapped_select", dojo.moduleUrl("gform","tests/test_primitive_mapped_select.html"));
		doh.registerUrl("gform.tests.primitive_checkedmultiselect", dojo.moduleUrl("gform","tests/test_primitive_checkedmultiselect.html"));
		doh.registerUrl("gform.tests.primitive_mapped_checkedmultiselect", dojo.moduleUrl("gform","tests/test_primitive_mapped_checkedmultiselect.html"));
		doh.registerUrl("gform.tests.primitive_list", dojo.moduleUrl("gform","tests/test_primitive_list.html"));
		doh.registerUrl("gform.tests.primitive_list_select", dojo.moduleUrl("gform","tests/test_primitive_list_select.html"));
		doh.registerUrl("gform.tests.group_tab", dojo.moduleUrl("gform","tests/test_group_tab.html"));
		doh.registerUrl("gform.tests.group_decorator", dojo.moduleUrl("gform","tests/test_group_decorator.html"));
		doh.registerUrl("gform.tests.validation", dojo.moduleUrl("gform","tests/test_validation.html"));
	}catch(e){
		doh.debug(e);
	}
});
