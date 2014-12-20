define(
	"gform.tests.module", [
		"gform/tests/Resolver",//
		"gform/tests/model/Model",//
		"gform/tests/model/PrimitiveModel",//
		"gform/tests/model/MultiGroup",//
		"gform/tests/model/ArrayModel",//
		"gform/tests/model/MapModel",//
		"gform/tests/model/SingleObject",//
        "gform/tests/model/SelectModel",//
		"gform/tests/model/MultiObject",//
		"gform/tests/model/MappedSelectModel",//
		"gform/tests/model/MergedMultiObject",//
		"gform/tests/validate/MaxItems",//
        "gform/tests/validate/MinItems",//
        "gform/tests/validate/AdditionalProperties",//
        "gform/tests/schema/Transformer",
        "gform/tests/schema/labelHelper",
		"gform/tests/special/formbuilder/GroupTransformer",
        "gform/tests/restHelper"
	], function () {

		try {
			doh.registerUrl("gform.tests.embedded_list", dojo.moduleUrl("gform", "tests/test_embedded_list.html"));
			doh.registerUrl("gform.tests.embedded_map", dojo.moduleUrl("gform", "tests/test_embedded_map.html"));
			doh.registerUrl("gform.tests.primitive_map", dojo.moduleUrl("gform", "tests/test_primitive_map.html"));
			doh.registerUrl("gform.tests.embedded_list_polymorphic", dojo.moduleUrl("gform", "tests/test_embedded_list_polymorphic.html"));
			doh.registerUrl("gform.tests.tab_list_polymorphic", dojo.moduleUrl("gform", "tests/test_tab_list_polymorphic.html"));
			doh.registerUrl("gform.tests.tab_list", dojo.moduleUrl("gform", "tests/test_tab_list.html"));
			doh.registerUrl("gform.tests.titlepanes", dojo.moduleUrl("gform", "tests/test_titlepanes.html"));
			doh.registerUrl("gform.tests.embedded", dojo.moduleUrl("gform", "tests/test_embedded.html"));
            doh.registerUrl("gform.tests.embedded.required", dojo.moduleUrl("gform", "tests/test_embedded_required.html"));
            doh.registerUrl("gform.tests.embedded_polymorphic", dojo.moduleUrl("gform", "tests/test_embedded_polymorphic.html"));
			doh.registerUrl("gform.tests.primitive_int", dojo.moduleUrl("gform", "tests/test_primitive_number.html"));
            doh.registerUrl("gform.tests.primitive_any", dojo.moduleUrl("gform", "tests/test_primitive_any.html"));
            doh.registerUrl("gform.tests.primitive_any_ace", dojo.moduleUrl("gform", "tests/ace/test_primitive_any.html"));
			doh.registerUrl("gform.tests.primitive_currencyamount", dojo.moduleUrl("gform", "tests/test_primitive_currencyamount.html"));
			doh.registerUrl("gform.tests.primitive_boolean", dojo.moduleUrl("gform", "tests/test_primitive_boolean.html"));
            doh.registerUrl("gform.tests.primitive_ace", dojo.moduleUrl("gform", "tests/test_primitive_ace.html"));
            doh.registerUrl("gform.tests.ace", dojo.moduleUrl("gform", "tests/ace/test_ace.html"));
			doh.registerUrl("gform.tests.primitive_date", dojo.moduleUrl("gform", "tests/test_primitive_date.html"));
			doh.registerUrl("gform.tests.primitive_time", dojo.moduleUrl("gform", "tests/test_primitive_time.html"));
			doh.registerUrl("gform.tests.primitive_string", dojo.moduleUrl("gform", "tests/test_primitive_string.html"));
			doh.registerUrl("gform.tests.primitive_textarea", dojo.moduleUrl("gform", "tests/test_primitive_textarea.html"));
			doh.registerUrl("gform.tests.primitive_select", dojo.moduleUrl("gform", "tests/test_primitive_select.html"));
			doh.registerUrl("gform.tests.primitive_ref", dojo.moduleUrl("gform", "tests/test_primitive_ref.html"));
            doh.registerUrl("gform.tests.primitive_binary", dojo.moduleUrl("gform", "tests/binary/test_primitive_binary.html"));
			doh.registerUrl("gform.tests.array_ref", dojo.moduleUrl("gform", "tests/test_array_ref.html"));
            doh.registerUrl("gform.tests.additionalProperties", dojo.moduleUrl("gform", "tests/test_additionalProperties.html"));
			doh.registerUrl("gform.tests.primitive_ref_in_tab", dojo.moduleUrl("gform", "tests/test_primitive_ref_in_tab.html"));
			doh.registerUrl("gform.tests.primitive_ref_in_dialog", dojo.moduleUrl("gform", "tests/test_primitive_ref_in_dialog.html"));
            doh.registerUrl("gform.tests.primitive_multi_ref_in_dialog", dojo.moduleUrl("gform", "tests/test_primitive_multi_ref_in_dialog.html"));
			doh.registerUrl("gform.tests.crudController", dojo.moduleUrl("gform", "tests/test_crudController.html"));
            doh.registerUrl("gform.tests.crudMultiController", dojo.moduleUrl("gform", "tests/test_crudMultiController.html"));
			doh.registerUrl("gform.tests.primitive_checkedselect", dojo.moduleUrl("gform", "tests/test_primitive_checkedselect.html"));
			doh.registerUrl("gform.tests.primitive_mapped_select", dojo.moduleUrl("gform", "tests/test_primitive_mapped_select.html"));
			doh.registerUrl("gform.tests.primitive_checkedmultiselect", dojo.moduleUrl("gform", "tests/test_primitive_checkedmultiselect.html"));
			doh.registerUrl("gform.tests.primitive_mapped_checkedmultiselect", dojo.moduleUrl("gform", "tests/test_primitive_mapped_checkedmultiselect.html"));
			doh.registerUrl("gform.tests.primitive_list", dojo.moduleUrl("gform", "tests/test_primitive_list.html"));
			doh.registerUrl("gform.tests.primitive_list_select", dojo.moduleUrl("gform", "tests/test_primitive_list_select.html"));
			doh.registerUrl("gform.tests.group_tab", dojo.moduleUrl("gform", "tests/test_group_tab.html"));
            doh.registerUrl("gform.tests.group_listpane", dojo.moduleUrl("gform", "tests/test_listpane.html"));
            doh.registerUrl("gform.tests.group_columns", dojo.moduleUrl("gform", "tests/test_group_columns.html"));
            doh.registerUrl("gform.tests.group_singleattribute", dojo.moduleUrl("gform", "tests/test_singleattribute.html"));
			doh.registerUrl("gform.tests.group_decorator", dojo.moduleUrl("gform", "tests/test_group_decorator.html"));
			doh.registerUrl("gform.tests.group_vertical", dojo.moduleUrl("gform", "tests/test_group_vertical.html"));
			doh.registerUrl("gform.tests.validation", dojo.moduleUrl("gform", "tests/test_validation.html"));
            doh.registerUrl("gform.tests.formbuilder", dojo.moduleUrl("gform", "tests/special/formbuilder/test_formbuilder.html"));


		} catch (e) {
			doh.debug(e);
		}
	});
