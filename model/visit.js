define([ 
"dojo/_base/lang",//
"dojo/_base/array",//
"dojo/_base/declare",//
"../schema/meta",//
], function(lang, array, declare, metaHelper) {
// module:
//		gform/model/visit

	var Visiting = declare(null,{
		constructor: function(visitor,editorFactory) {
			this.editorFactory=editorFactory;
			this.visitor=visitor;
		},	
		visit: function(meta, modelHandle, ctx) {
				var factory = this.editorFactory? this.editorFactory.getFactory(meta): null;
				if (factory==null || !factory.visit) {
					var attributes =  meta.attributes;
					array.forEach(attributes, function(attribute) {
						if (metaHelper.isSingleComplex(attribute)) {
							this.goonComplex(attribute, modelHandle.value[attribute.code], ctx);
						} else if (metaHelper.isArray(attribute)) {
							this.goonArray(attribute, modelHandle.value[attribute.code], ctx);
						} else {
							this.goon(attribute, modelHandle.value[attribute.code], ctx);
						}
					}, this);
				}else{
					factory.visit(meta, modelHandle, callback);
				}
			},
			visitAttribute : function(meta, modelHandle, ctx) {
					var type =metaHelper.getComplexType(meta, modelHandle);
					this.visit(type, modelHandle, ctx);
			},
		  goon : function(meta, modelHandle, ctx) {
				var me=this;
				this.visitor.visit(meta, modelHandle, function(x){me.visit(meta, modelHandle, x);}, ctx);	
			},
			goonComplex : function(meta, modelHandle, ctx) {
				var me=this;
				this.visitor.visit(meta, modelHandle, function(x){me.visitAttribute(meta, modelHandle, ctx);},ctx);	
			},
			goonElement : function(meta, modelHandle, ctx) {
					array.forEach(modelHandle.value, function(el, idx) {
						var single = metaHelper.createElement(meta);
						var me=this;
						this.visitor.visitElement(single, el, function(x){me.visitAttribute(single, el, x);}, idx,ctx);	
					}, this);
			},
			goonArray : function(meta, modelHandle, ctx) {
				var me=this;
				this.visitor.visit(meta, modelHandle, function(x){me.goonElement(meta, modelHandle, x);}, ctx);	
			}
		});
		
	return function(visitor, ef, meta, modelHandle,ctx) {
			new Visiting(visitor,ef).visit(meta, modelHandle,ctx);
	};


})




