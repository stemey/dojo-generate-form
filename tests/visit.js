define(["doh/runner","dojo/_base/lang","dojo/_base/array","dojox/mvc/equals","dojo/Stateful","gform/model/getPlainValue","gform/model/updateModelHandle", "gform/model/visit","gform/schema/meta", "dojo/_base/json"], function(doh,lang, array, equals,Stateful,getPlainValue,updateModelHandle, visit, metaHelper){

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
		var polyAttribute={
						type_property:"ext_type",
						code:"objectP",
						validTypes:[
							type1,
							type2
						]
		}

	

		var primitiveArray= {
			attributes:[
				{code:"things","array":true,type:"string"}
			]
		}



		var createVisitor= function() {
			return {
				visitElement: function(meta, modelHandle, goon, idx, ctx){
					if (metaHelper.isComplex(meta)) {
						var value={};
						var type_property= metaHelper.getTypeProperty(meta);	
						if (type_property) {
							value[type_property]= modelHandle.value[type_property].value;
						}
						ctx.push(value);	
						goon(value);
					}else	if (metaHelper.isPrimitive(meta)) {
						ctx.push(modelHandle.value);
					}
				},
				visit: function(meta, modelHandle, goon, ctx){
					if (metaHelper.isArray(meta)) {
						var value=[];
						ctx[meta.code]=value;	
						goon(value);
					}else if (metaHelper.isComplex(meta)) {
						var value={};
						var type_property= metaHelper.getTypeProperty(meta);	
						if (type_property) {
							value[type_property]= modelHandle.value[type_property].value;
						}
						ctx[meta.code]=value;	
						goon(value);
					}else	if (metaHelper.isPrimitive(meta)) {
						ctx[meta.code]=modelHandle.value;
					}
				}	
			}
		}

		var assertEqual = function(expected, actual) {
			doh.assertEqual(dojo.toJson(expected), dojo.toJson(actual));
		}

    doh.register("gform-visit", [
      function testComplex(){
				var modelHandle = updateModelHandle.createMeta();
				var input = {thing1:{stringP:"5"}};
        updateModelHandle.update(type1,input,modelHandle);
				var expected = getPlainValue(modelHandle);
				var visitor = createVisitor();
				var ctx ={};
				visit(visitor,null,type1, modelHandle,ctx);
				doh.assertTrue(equals(ctx,expected));
      },
     function testPrimitiveArray(){
				var modelHandle = updateModelHandle.createMeta();
				var expected ={things:["a","b"]};
        updateModelHandle.update(primitiveArray,expected,modelHandle);
				var expected = getPlainValue(modelHandle);
				var visitor = createVisitor();
				var ctx ={};
				visit(visitor,null,primitiveArray, modelHandle,ctx);
				doh.assertTrue(equals(ctx,expected));
      },
     function testComplexArray(){
				var modelHandle = updateModelHandle.createMeta();
				var polyArray = {};
				lang.mixin(polyArray, polyAttribute);
				polyArray.array=true;
				polyArray = {attributes : [polyArray]}
				var input ={objectP:[{ext_type:"thing1",stringP:"hi"},{ext_type:"thing2", stringP2:"ho"}]};
        updateModelHandle.update(polyArray,input,modelHandle);
				var expected = getPlainValue(modelHandle);
				var visitor = createVisitor();
				var ctx ={};
				visit(visitor,null,polyArray, modelHandle,ctx);
				doh.assertTrue(equals(ctx,expected));
      },
    ]);

     
});

