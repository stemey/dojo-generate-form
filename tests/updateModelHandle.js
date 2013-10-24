define(["doh/runner","dojo/_base/lang","dojox/mvc/equals","dojo/Stateful","gform/model/getPlainValue","gform/model/updateModelHandle","dojo/_base/json"], function(doh,lang,equals,Stateful,getPlainValue,updateModelHandle){

		var type1=					
				{
						type: "object"
						attributes:
							[
								{code:"stringP",type:"string"},
								{code:"booleanP",type:"boolean"},
								{code:"numberP",type:"number"}
							]
					}
		var type2=					
				{
						attributes:
							[
								{code:"stringP2",type:"string"},
							]
					}

		var meta=
			{
				attributes: [
					{
						type_property:"ext_type",
						code:"objectP",
						validTypes:[
							type1
						]
					}
					]
			}
		var polyAttribute={
						type: "multi-object",
						type_property:"ext_type",
						code: "objectP",
						groups:[
							type1,
							type2
						]
		}

		var requiredPolyAttribute={
						type: "multi-object",
						type_property:"ext_type",
						code:"objectP",
						required:true,
						validTypes:[
							type1,
							type2
						]
		}

		var objectAttribute={
						type: "object",
						type_property:"ext_type",
						code:"objectP",
						group:
							type1		}

		var primitiveArray= {
			attributes:[
				{code:"things",array:true,type:"array", items: {type: "string"}}
			]
		}

		var emptyType1= {
			stringP:null,
			booleanP:false,
			numberP:null,
		}
		var emptyMeta= {
			objectP: {
				stringP:"",
				booleanP:false,
				numberP:null
			}
		}
		var polyMeta1= {
			objectP: {
				ext_type:"thing1",
				stringP:"hallo",
				booleanP:true,
				numberP:1.223
			}
		}

		var assertEqual = function(expected, actual) {
			doh.assertEqual(dojo.toJson(expected), dojo.toJson(actual));
		}

    doh.register("gform-updateModelHandle", [
      function testValue(){
				var modelHandle = updateModelHandle.createMeta();
        updateModelHandle.update(type1,{},modelHandle);
				var plainValue = getPlainValue(modelHandle);
				console.log("expected"+dojo.toJson(emptyType1));
				console.log("actual"+dojo.toJson(plainValue));
				doh.assertTrue(equals(plainValue,emptyType1));
      },
      function testObjectInitNull(){
				var modelHandle = updateModelHandle.createMeta();
        updateModelHandle.updateObject(objectAttribute,null,modelHandle);
				var plainValue = getPlainValue(modelHandle);
				doh.assertTrue(null==plainValue);
				doh.assertEqual(null,modelHandle.nonNullValue.value.stringP.value);
      }, 	
      function testObjectInitNotNull(){
				var modelHandle = updateModelHandle.createMeta();
        updateModelHandle.updateObject(objectAttribute,{stringP:"hallo"},modelHandle);
				var plainValue = getPlainValue(modelHandle);
				doh.assertEqual("hallo",plainValue.stringP);
				doh.assertEqual("hallo",modelHandle.nonNullValue.value.stringP.value);
      },
      function testObjectUpdateNotNull(){
				var modelHandle = updateModelHandle.createMeta();
        updateModelHandle.updateObject(objectAttribute,{stringP:"bye"},modelHandle);
				var initialNonNullValue=modelHandle.nonNullValue;
        updateModelHandle.updateObject(objectAttribute,{stringP:"hallo"},modelHandle);
				var plainValue = getPlainValue(modelHandle);
				doh.assertEqual(initialNonNullValue,modelHandle.nonNullValue);
				doh.assertEqual("hallo",plainValue.stringP);
				doh.assertEqual("hallo",modelHandle.nonNullValue.value.stringP.value);
      },
      function testObjectSetNull(){
				var modelHandle = updateModelHandle.createMeta();
        updateModelHandle.updateObject(objectAttribute,emptyType1,modelHandle);
        updateModelHandle.updateObject(objectAttribute,null,modelHandle);
        updateModelHandle.updateObject(objectAttribute,emptyType1,modelHandle);
				var plainValue = getPlainValue(modelHandle);
				console.log("expected"+dojo.toJson(emptyType1));
				console.log("actual"+dojo.toJson(plainValue));
				doh.assertTrue(equals(plainValue,emptyType1));
      },
      function testPolyObject(){
				var modelHandle = updateModelHandle.createMeta();
        updateModelHandle.updatePolyObject(polyAttribute,polyMeta1.objectP,modelHandle);
				var plainValue = getPlainValue(modelHandle);
				console.log("expected"+dojo.toJson(polyMeta1.objectP));
				console.log("actual"+dojo.toJson(plainValue));
				doh.assertTrue(equals(plainValue,polyMeta1.objectP));
				doh.assertEqual(modelHandle.typeToValue["thing1"].value,modelHandle.value);
      },
      function testRequiredPolyObject(){
				var modelHandle = updateModelHandle.createMeta();
				updateModelHandle.updatePolyObject(requiredPolyAttribute,null,modelHandle);
				var plainValue = getPlainValue(modelHandle);
				doh.assertEqual(requiredPolyAttribute.validTypes[0].code,plainValue.ext_type);
				doh.assertEqual(modelHandle.value.ext_type.value,plainValue.ext_type);
      },
      function testPolyObjectSwitchType(){
				var modelHandle = updateModelHandle.createMeta();
        updateModelHandle.updatePolyObject(polyAttribute,polyMeta1.objectP,modelHandle);
				var objectP2={ext_type:"thing2",stringP2:"xxx"};
        updateModelHandle.updatePolyObject(polyAttribute,objectP2,modelHandle);
				var plainValue = getPlainValue(modelHandle);
				console.log("expected"+dojo.toJson(objectP2));
				console.log("actual"+dojo.toJson(plainValue));
				doh.assertTrue(equals(plainValue,objectP2));
				doh.assertEqual(modelHandle.typeToValue["thing2"].value,modelHandle.value);
      },
      function testPimitiveArray(){
				var modelHandle = updateModelHandle.createMeta();
				var expected ={things:["a","b"]};
        updateModelHandle.update(primitiveArray,expected,modelHandle);
				var plainValue = getPlainValue(modelHandle);
				console.log("expected"+dojo.toJson(expected));
				console.log("actual"+dojo.toJson(plainValue));
				doh.assertEqual("b",modelHandle.value.things.value[1].value);
				doh.assertTrue(equals(plainValue,expected));
      },
      function testUpdateMergedObject(){
				var meta={
					code:"x",
					type_property:"ext_type",
					validTypes: [
						{code:"thing1",attributes:[{code:"a",type:"string"},{code:"b",type:"string"}]},
						{code:"thing2",attributes:[{code:"b",type:"string"},{code:"c",type:"string"}]}
					]
				};
				var modelHandle = updateModelHandle.createMeta();
				var expected ={ext_type:"thing1",a:"1",b:"2"};
        updateModelHandle.updateMergedObject(meta,expected,modelHandle);
				var plainValue = getPlainValue(modelHandle);
				assertEqual(expected,plainValue);
				console.log("expected"+dojo.toJson(expected));
				console.log("actual"+dojo.toJson(plainValue));
      },
      function testSwitchTypeInMergedObject(){
				var meta={
					code:"x",
					type_property:"ext_type",
					validTypes: [
						{code:"thing1",attributes:[{code:"a",type:"string"},{code:"b",type:"string"}]},
						{code:"thing2",attributes:[{code:"b",type:"string"},{code:"c",type:"string"}]}
					]
				};
				var modelHandle = updateModelHandle.createMeta();
				var initialValue ={ext_type:"thing1",a:"1",b:"2"};
				var expected ={ext_type:"thing2",b:"2",c:null};
        updateModelHandle.updateMergedObject(meta,expected,modelHandle);
        updateModelHandle.switchTypeInMergedObject(meta,"thing2",modelHandle);
				var plainValue = getPlainValue(modelHandle);
				console.log("expected"+dojo.toJson(expected));
				console.log("actual"+dojo.toJson(plainValue));
				assertEqual(expected,plainValue);
      },
      function testNumberNull(){
				var meta={
					type:"number"
				};
				var modelHandle = updateModelHandle.createMeta();
 	      updateModelHandle.updateNumber(meta,5,modelHandle);
        updateModelHandle.updateNumber(meta,null,modelHandle);
        var plainValue = getPlainValue(modelHandle);
				doh.assertEqual(null,plainValue);
				doh.assertEqual(null, modelHandle.oldValue);
      },
      function testUpdateMergedObjectWithDifferentType(){
				var meta={
					code:"x",
					type_property:"ext_type",
					validTypes: [
						{code:"thing1",attributes:[{code:"a",type:"string"},{code:"b",type:"string"}]},
						{code:"thing2",attributes:[{code:"b",type:"string"},{code:"c",type:"string"}]}
					]
				};
				var modelHandle = updateModelHandle.createMeta();
				var initialValue ={ext_type:"thing2",b:"1",c:"2"};
        updateModelHandle.updateMergedObject(meta,initialValue,modelHandle);
				var expected ={ext_type:"thing1",a:"1",b:"2"};
				updateModelHandle.updateMergedObject(meta,expected,modelHandle);
				var plainValue = getPlainValue(modelHandle);
				console.log("expected"+dojo.toJson(expected));
				console.log("actual"+dojo.toJson(plainValue));
 				assertEqual(expected,plainValue);
     }
    ]);

     
});

