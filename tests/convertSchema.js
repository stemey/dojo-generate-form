define(["doh/runner", "gform/util/refresolve", "gform/schema/convertSchema", "dojo/text!./meta/contacts_schema.json"], function (doh, refresolve, convertSchema, contactsSchemaJson) {


    var schemaWithRef = {
        definitions: [
            {id: "cars", properties: {elements: {type: "array", items: {type: {"$ref": "car"}}}}}
        ],
        id: "car",
        properties: {sisters: {type: {"$ref": "cars"}}}
    };

    var simpleSchema = {
        id: "car",
        properties: {
            sisters: {type: "array", items: {type: "string"}},
            brother: {type: "string"},
            address: {type: {properties: {city: {type: "string"}}}},
            emails: {type: "array", items: {type: {properties: {email: {type: "string"}}}}}
        }
    };
    var stringSchema = {
        id: "car",
        properties: {
            brother: {type: "string"}
        }
    };
    var integerSchema = {
        id: "car",
        properties: {
            brother: {type: "integer"}
        }
    };
    var dateSchema = {
        id: "car",
        properties: {
            brother: {type: "string", format: "date"}
        }
    };
    var stringArraySchema = {
        id: "stringArray",
        properties: {
            sisters: {type: "array", items: {type: "string"}}
        }
    };
    var complexSchema = {
        id: "car",
        properties: {
            address: {type: {properties: {city: {type: "string"}}}}
        }
    };
    var complexSchema2 = {
        id: "car",
        properties: {
            address: {type: "object", properties: {city: {type: "string"}}}
        }
    };
    var complexArraySchema = {
        id: "car",
        properties: {
            emails: {type: "array", items: {type: {properties: {email: {type: "string"}}}}}
        }
    };
    var complexArraySchema2 = {
        id: "car",
        properties: {
            emails: {type: "array", items: {type: "object", properties: {email: {type: "string"}}}}
        }
    };


    doh.register("gform-convertSchema", [
        function testContactsSchema() {
            var contactsSchema = JSON.parse(contactsSchemaJson);
            refresolve(contactsSchema);
            convertSchema(contactsSchema);
        },
        function testSchemaWithCircularRef() {
            refresolve(schemaWithRef);
            convertSchema(schemaWithRef);

        },
        function testStringSchema() {
            refresolve(stringSchema);
            var meta = convertSchema(stringSchema);
            doh.assertEqual("string", meta.attributes[0].type);
        },
        function testIntegerSchema() {
            var meta = convertSchema(integerSchema);
            doh.assertEqual("number", meta.attributes[0].type);
        },
        function testDateSchema() {
            var meta = convertSchema(dateSchema);
            doh.assertEqual("date", meta.attributes[0].type);
        },
        function testStringArraySchema() {
            refresolve(stringArraySchema);
            var meta = convertSchema(stringArraySchema);
            doh.assertEqual("array", meta.attributes[0].type);
            doh.assertEqual("string", meta.attributes[0].element.type);
        },
        function testComplexSchema() {
            refresolve(complexSchema);
            var meta = convertSchema(complexSchema);

            doh.assertEqual("object", meta.attributes[0].type);
            doh.assertEqual("string", meta.attributes[0].group.attributes[0].type);
        }    ,
        function testComplexSchema2() {
            refresolve(complexSchema2);
            var meta = convertSchema(complexSchema2);

            doh.assertEqual("object", meta.attributes[0].type);
            doh.assertEqual("string", meta.attributes[0].group.attributes[0].type);
        },
        function testComplexArraySchema() {
            refresolve(complexArraySchema);
            var meta = convertSchema(complexArraySchema);

            doh.assertEqual("array", meta.attributes[0].type);
            doh.assertEqual("string", meta.attributes[0].group.attributes[0].type);
        }    ,
        function testComplexArraySchema2() {
            refresolve(complexArraySchema2);
            var meta = convertSchema(complexArraySchema2);

            doh.assertEqual("array", meta.attributes[0].type);
            doh.assertEqual("string", meta.attributes[0].group.attributes[0].type);
        }
    ]);

    function findAttribute(schema, code) {
        for (var key in schema.attributes) {
            var attribute = schema.attributes[key];
            if (attribute.code === code) {
                return attribute;
            }
        }
        throw new Error("attribute " + code + " not found");
    }

});




