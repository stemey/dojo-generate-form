define([ 
"dojo/_base/lang",//
"dojo/_base/array",//
"../schema/meta",//
], function(lang, array, metaHelper) {
// module:
//		gform/model/visit

	var visit = function(meta, modelHandle, visitor, editorFactory) {
		var factory = editorFactory? editorFactory.getFactory(meta): null;
		if (factory==null || !factory.visit) {
			var attributes =  meta.attributes;
			array.forEach(attributes, function(attribute) {
				if (metaHelper.isSingleComplex(attribute)) {
					goonComplex(attribute, modelHandle.value[attribute.code]);
				} else if (metaHelper.isArray(attribute)) {
					goonArray(attribute, modelHandle.value[attribute.code], visitor, editorFactory);
				} else {
					goon(attribute, modelHandle.value[attribute.code], visitor, editorFactory);
				}
			});
		}else{
			factory.visit(meta, modelHandle, callback);
		}
	}
	var visitAttribute = function(meta, modelHandle, visitor, editorFactory) {
			var type =metaHelper.getComplexType(meta, modelHandle);
			visit(type, modelHandle, visitor, editorFactory);
	}
	var goon = function(meta, modelHandle, visitor, editorFactory) {
		visitor.visit(meta, modelHandle, function(){visit(meta, modelHandle, visitor, editorFactory);});	
	}
	var goonComplex = function(meta, modelHandle, visitor, editorFactory) {
		visitor.visit(meta, modelHandle, function(){visitAttribute(meta, modelHandle, visitor, editorFactory);});	
	}
	var goonElement = function(meta, modelHandle, visitor, editorFactory) {
			array.forEach(modelHandle.value, function(el) {
				var single = metaHelper.createElement(meta);
				visitor.visitElement(single, el, function(){visitAttribute(single, el, visitor, editorFactory);});	
			});
	}
	var goonArray = function(meta, modelHandle, visitor, editorFactory) {
		visitor.visit(meta, modelHandle, function(){goonElement(meta, modelHandle, visitor, editorFactory);});	
	}
		
	return visit;


})




