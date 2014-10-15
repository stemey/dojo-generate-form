define([
	"dojo/_base/lang"
], function (lang) {
// module:
//		gform/primitive/dijitHelper

	var standardProps = {};
	standardProps.code = { type: "string", required: true, description: "the name of the property"};
	standardProps.label = { type: "string", description: "the label of the property displayed in a form. If empty the code will be displayed."};
	standardProps.description = { type: "string", description: "the info text for the property.", editor: "simpletextarea"};
	standardProps.array = { type: "boolean", description: "if checked the attribute is an array"};
	standardProps.map = { type: "boolean", description: "if checked the attribute is a map"};
	standardProps.keyLabel = { type: "string", description: "label of the map's key"};
	standardProps.keyDescription = { type: "string", description: "description of the map's key."};
	standardProps.reorderable = { type: "boolean", description: "if checked the array is reorderable"};
	standardProps.disabled = { type: "boolean", description: "if checked the value is not editable"};
	standardProps.visible = { type: "boolean", description: "if checked the value is not visible", "default": true};

	var extraProps = {};
	extraProps.missingMessage = { type: "string", description: "the error message for required but empty values."};
	extraProps.promptMessage = { type: "string", description: ""};
	extraProps.placeHolder = { type: "string", description: "the message displayed in a text field when it's value is empty"};
	extraProps.invalidMessage = { type: "string", description: "the error message for invalid values"};
	extraProps.pattern = { type: "string", description: "the regular expression to validate text values"};
	extraProps.properCase = { type: "boolean"};
    extraProps.intermediateChanges = { type: "boolean"};
	extraProps.upperCase = { type: "boolean"};
	extraProps.maxLength = { type: "number", description: "the maximum length of a text value"};
	extraProps.required = { type: "boolean", description: "an empty value is invalid "};
	extraProps.locale = { type: "string", description: "the locale used for formatting."};


	var allDijitProperties = [];
	for (var key in extraProps) {
		allDijitProperties.push(key);
	}
	for (var key2 in standardProps) {
		allDijitProperties.push(key2);
	}

	var dijitHelper = {
		// summary:
		//		object that provides functions to initialize dijits and create schemas for attributes.
		addSchemaProperty: function (key, props) {
			// summary:
			//		add predefined extra schema property (e.g. "maxLength").
			// props: Object
			//		the schema to add properties to
			props[key] = extraProps[key];
		},
		addSchemaProperties: function (props) {
			// summary:
			//		add all predefined schema properties (e.g. "required").
			// props: Object
			//		the schema to add properties to
			lang.mixin(props, standardProps);
		},
		copyProperty: function (key, attribute, dijitProps) {
			// summary:
			//		copy attribute's  property to widget property.
			// key: Stringject
			//		name of the property (e.g. "required")
			// attribute: Object
			//		the attribute schema
			// dijitProps: Object
			//		the dijit config object
			if (typeof attribute[key] !== "undefined" && attribute[key] != null && attribute[key] !== "") {
				dijitProps[key] = attribute[key];
			}
		},
		copyDijitProperties: function (attribute, dijitProps) {
			// summary:
			//		copy all standard and extra properties in attribute to dijitProps.
			// attribute: Object
			//		the attribute schema
			// dijitProps: Object
			//		the dijit config object
			for (var key in allDijitProperties) {
				this.copyProperty(allDijitProperties[key], attribute, dijitProps);
			}
		},
		getMappedValuesSchema: function () {
			// summary:
			//		the schema for mapped values is returned.
			// returns: Object
			//		the schema for mapped values
			return {
				type: "object",
				description: "a map of options.",
				additionalProperties: {
					type: "array",
					items: {
						type: [
							{type: "string"},
							{type: "object", properties: {label: {type: "string"}, value: {type: "string"}}}
						]
					}
				}
			};
		}
	};

	return dijitHelper;
});
