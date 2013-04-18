define([ "dojo/_base/array", "dojo/aspect", "dojo/_base/lang", "dojo/_base/declare",
		 "dijit/layout/_LayoutWidget", "dijit/layout/utils", "dojo/dom-style","dojo/dom-geometry",
		"dojo/dom-construct", "dojo/dom-class" ], function(array, aspect,  lang,
		declare,  _LayoutWidget, layoutUtils, domStyle, domGeometry, domConstruct, domClass) {

	return declare("gform.layout.ColumnContainer", [_LayoutWidget], {
		baseClass : "gformColumnContainer",
		buildRendering: function() {
			this.inherited(arguments);
			domClass.add(this.domNode, "clearfix");
		},
		layout: function() {
			var oldColumnCount=this.columnCount;
			var childCount=this._getChildCount();
			var maxChildWidth =this._getMaxChildWidth();
			this.columnCount=Math.floor(this._contentBox.w/maxChildWidth); 
			if (this._contentBox.w>650) {
				console.log("very wide "+this._contentBox.w+"  "+maxChildWidth+ " "+Math.floor(this.columnCount));
			}
			if (isNaN(this.columnCount)) {
				this.columnCount=1;
			}
			if (this.columnCount>5) {
				this.columnCount=5;
			}
			this.columnWidth=	Math.floor(this._contentBox.w/this.columnCount);
			var oldClass=this.currentClass;
			var currentClass=this.createColumnClass(this.columnCount);
			if (oldColumnCount) {
				domClass.replace(this.domNode,currentClass,this.createColumnClass(oldColumnCount));
			} else {
				domClass.add(this.domNode,currentClass);
			}
			array.forEach(this.getChildren(), function(child) {
				if (child.resize) {
					child.resize()
				}
			});

			
						
		},
		createColumnClass: function(columnCount) {
			return "columns_"+columnCount;
		},
		_getChildCount: function() {
			return this.getChildren().length;
		},
		addChild: function(child) {
			this.inherited(arguments);
			// we need to add a br, because the child maybe "inline-block", to make its size computable.
			//var br = document.createElement("br");
			//this.domNode.appendChild(br);
		},	
		_getMaxChildWidth: function() {
			var maxChildWidth=0;
			array.forEach(this.getChildren(),function(child) {
				var dim=domGeometry.getMarginBox(child.domNode);
				if (dim.w>maxChildWidth) {
					maxChildWidth=dim.w;
				}
			});
			return maxChildWidth;
		}	
	});
	
});
