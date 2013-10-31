define([ "dojo/_base/array", //
"dojo/_base/lang",//
"dojo/_base/declare",//
"dojo/Stateful",//
"./equals",
], function(array, lang, declare, Stateful, equals) {
	// module: 
	//		gform/Resolver

	return declare([Stateful], {
	// summary:
	//		Provides access to sibling attributes of modelHandle. 

		// schema:,
		//		the schema of this model
		schema:null	,

		// parent:,
		//		the parent model
		parent:null	,
		state:"",
		errorCount:0,
		incompleteCount:0,
		changedCount:0,	

		editorFactory: null,
		tmp:{},

		constructor: function(kwArgs) {				
			lang.mixin(this, kwArgs);
			this.iterateChildren( function(model) {
					model.parent=this;
			});
			this.watch("state", lang.hitch(this, "onChange"));
			this.watch("value", lang.hitch(this, "onChange"));
		},
		getPath: function(modelHandle) {
			// summary:
			//		get the absolute path to the current attribute
			// returns: String
			//		absolute path
			return "";
		},
		getParent : function(attributeCode) {
			// summary:
			//		get value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			return this.parent.value.get(attributeCode).value;
		},
		watchParent: function( attributeCode, watchCallback) {
			// summary:
			//		watch value of sibling attribute
			// attributeCode: String
			//		the name of he sibling attribute
			// watchCallback: function
			//		callback
			// returns: Object
			//		WatchHandle
			return this.parent.value[attributeCode].watch("value",watchCallback);
		},
		createMeta: function(schema) {
			// summary:
			//		create a meta object
			// returns: dojo/Stateful
			var meta= this.editorFactory.createMeta(schema);
			meta.set("tmp",new Stateful());
			meta.parent=this;
			return meta;	
		},
		bubble:true,
		hasChanged: function() {
			return this.getPlainValue()!=this.oldValue && !equals(this.getPlainValue(), this.oldValue);
		},
		onChange: function(child) {
			if (this.bubble) {
				this.computeProperties(child);
				if (this.parent) {
					this.parent.onChange(this);
				}
			}
		},
		_execute: function(cb, bubble) {
			oldBubble = this.bubble;
			this.bubble= bubble==true;		
			try {
				cb.call(this);
			} finally {
				this.bubble=oldBubble;
			}
		},
		computeProperties: function(child) {
			var errorCount=0;
			var incompleteCount=0;
			var changedCount=0;
			this.iterateChildren(function(model) {
				errorCount+= model.errorCount;
				incompleteCount+= model.incompleteCount;
				changedCount+= model.changedCount;
			});
			if (this.state=="Error") errorCount++;
			if (this.state=="Incomplete") incompleteCount++;
			if (this.hasChanged() && changedCount==0) {
				changedCount=1;
			}
			this.set("incompleteCount", incompleteCount);
			this.set("changedCount", changedCount);
			this.set("errorCount", errorCount);
		},
		resetMeta: function(/*dojo/Stateful*/meta) {
			// summary:
			//		rest meta object
			// meta: dojo/Stateful
			meta.set("tmp",new Stateful());
			meta.set("message",null);
			meta.set("state","");
			return meta;	
		},	})
});
