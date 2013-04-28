define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
], function(array, lang, declare) {

	var SchemaGenerator= declare("gform.SchemaGenerator", null, {
		GROUPS_REF:"groups",
		ATTRIBUTES_REF:"attributes",
		generate: function(editorFactory) {
			var schema = {};
			var groupsRef=[];
			var attributesRef=[];
			schema.type="object";
			schema.id="editor";
			var definitions=[];
			this._createGroupsRef(definitions,groupsRef);
			this._createAttributesRef(definitions,attributesRef);
			definitions[this.ATTRIBUTES_REF]=attributesRef;
			schema.definitions=definitions;
			schema.properties={"editor":{type:groupsRef,gform_type_property:"groupType",required:true}};
			
			var groupFactoryMap = editorFactory.getGroupFactoryMap();
			for (var key in groupFactoryMap) {
				var gf = groupFactoryMap[key];
				if (gf.getSchema) {
					var subschema = gf.getSchema();
					if (!subschema.properties) {
						subschema.properties={};
					}
					subschema.properties.groupType={type:"string", required:true, visible:false};		
					subschema.properties.groupType.enum=[key];
					subschema.id=key;
					definitions.push(subschema);
					groupsRef.push({$ref:key});
				}
			}

			var attributeFactories = editorFactory.getAttributeFactories();
			for (var key in attributeFactories) {
				var af = attributeFactories[key];
				if (af.getSchema) {
					var subschema = af.getSchema();	
					if (subschema.id) {
						definitions.push(subschema);
						attributesRef.push({$ref:subschema.id});
					}else{
						throw new Error("attribute schema has no id "+af.declaredClass);
					}
				}
			}

			var attributeFactoryMap = editorFactory.getAttributeFactoryMap();
			for (var key in attributeFactoryMap) {
				var af = attributeFactoryMap[key];
				if (af &&  af.getSchema) {
					var subschema = af.getSchema();	
					subschema.id=key;
					subschema.properties.editor={type:"string",required:true,enum:[key]};
					definitions.push(subschema);
					attributesRef.push({$ref:subschema.id});
				}
			}


			return schema;
		},
		_createGroupsRef: function(definitions,groups) {
			var groupsRef ={};
			groupsRef.id=this.GROUPS_REF;
			groupsRef.type="array";
			groupsRef.gform_type_property="groupType";
			groupsRef.items={type:groups};
			definitions.push(groupsRef);
		},
		_createAttributesRef: function(definitions,attributes) {
			var attributesRef ={};
			attributesRef.id=this.ATTRIBUTES_REF;
			attributesRef.gform_type_property="_type";
			attributesRef.type="array";
			attributesRef.items={type:attributes};
			definitions.push(attributesRef);
		}	
	})
	return new SchemaGenerator();	
});
