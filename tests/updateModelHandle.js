define(["doh/runner","dojo/_base/lang","dojox/mvc/equals","dojo/Stateful","gform/getPlainValue","gform/updateModelHandle","dojo/_base/json"], function(doh,lang,equals,Stateful,getPlainValue,updateModelHandle){

		var type1=					
				{
						code:"thing1",
						attributes:
							[
								{code:"stringP",type:"string"},
								{code:"booleanP",type:"boolean"},
								{code:"numberP",type:"number"}
							]
					}
		var type2=					
				{
						code:"thing2",
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
		var polyMeta={}
		lang.mixin(polyMeta,meta);
		polyMeta.attributes[0].validTypes.push(type2);

		var primitiveArray= {
			attributes:[
				{code:"things",array:true,type:"string"}
			]
		}

		var emptyType1= {
			stringP:"",
			booleanP:false,
			numberP:0,
		}
		var emptyMeta= {
			objectP: {
				stringP:"",
				booleanP:false,
				numberP:0
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

    doh.register("gform", [
      function testValue(){
				var modelHandle = updateModelHandle.createMeta();
        updateModelHandle.updateObjectType(null,type1,{},modelHandle);
				var plainValue = getPlainValue(modelHandle);
				console.log("expected"+dojo.toJson(emptyType1));
				console.log("actual"+dojo.toJson(plainValue));
				doh.assertTrue(equals(plainValue,emptyType1));
      },
      function testObject(){
				var modelHandle = updateModelHandle.createMeta();
        updateModelHandle.updateObjectType(null,meta,{objectP:{}},modelHandle);
				var plainValue = getPlainValue(modelHandle);
				console.log("expected"+dojo.toJson(emptyMeta));
				console.log("actual"+dojo.toJson(plainValue));
				doh.assertTrue(equals(plainValue,emptyMeta));
      },
      function testPolyObject(){
				var modelHandle = updateModelHandle.createMeta();
        updateModelHandle.updateObjectType(null,meta,polyMeta1,modelHandle);
				var plainValue = getPlainValue(modelHandle);
				console.log("expected"+dojo.toJson(polyMeta1));
				console.log("actual"+dojo.toJson(plainValue));
				doh.assertTrue(equals(plainValue,polyMeta1));
      },
      function testPimitiveArray(){
				var modelHandle = updateModelHandle.createMeta();
				var expected ={things:["a","b"]};
        updateModelHandle.updateObjectType(null,primitiveArray,expected,modelHandle);
				var plainValue = getPlainValue(modelHandle);
				console.log("expected"+dojo.toJson(expected));
				console.log("actual"+dojo.toJson(plainValue));
				doh.assertEqual("b",modelHandle.value.things.value[1].value);
				doh.assertTrue(equals(plainValue,expected));
      }
    ]);

});

