define([ "dojo/_base/array", "dojo/_base/declare",
	"dijit/layout/_LayoutWidget", "dojo/dom-geometry",
	"dojo/dom-class"  ], function (array, declare, _LayoutWidget, domGeometry, domClass) {

	return declare([_LayoutWidget], {
		// module:
		//		The ColumnsGroup display an array of attributes in as many columns as possible. It first calculates the maximum width of all its children. Then it sets a class that will create the approproate number of columns via css-columns. Children are automatically are display:inline-block by ths container style, so that there size can be accurately measured. <br> are inserted to create a break after each of he children.
		baseClass: "gformColumnContainer",
		buildRendering: function () {
			this.inherited(arguments);
			if (this.meta.description) {
				var description = document.createElement("p");
				description.innerHTML = this.meta.description;
				domClass.add(description, "columnContainerDescription");
				this.domNode.appendChild(description);
			}
			var canvas = document.createElement("div");
			domClass.add(canvas, "gformColumnCanvas");
			this.domNode.appendChild(canvas);
			domClass.add(canvas, "clearfix");
			this.containerNode = canvas;
		},
		layout: function () {
			var oldColumnCount = this.columnCount;
			if (!this.maxChildWidth) {
				var width = this._getMaxChildWidth();
				if (width > 0) {
					this.maxChildWidth = width + 10;
				}
			}
			this.columnCount = Math.floor(this._contentBox.w / this.maxChildWidth);
			if (isNaN(this.columnCount)) {
				this.columnCount = 1;
			}
			if (this.columnCount > 5) {
				this.columnCount = 5;
			}
			this.columnWidth = Math.floor(this._contentBox.w / this.columnCount);
			var currentClass = this.createColumnClass(this.columnCount);
			if (oldColumnCount) {
				domClass.replace(this.containerNode, currentClass, this.createColumnClass(oldColumnCount));
			} else {
				domClass.add(this.containerNode, currentClass);
			}
			array.forEach(this.getChildren(), function (child) {
				if (child.resize) {
					child.resize();
				}
			});


		},
		createColumnClass: function (columnCount) {
			return "columns_" + columnCount;
		},
		_getChildCount: function () {
			return this.getChildren().length;
		},
		addChild: function () {
			this.inherited(arguments);
			// we need to add a br, because the child maybe "inline-block", to make its size computable.
			var br = document.createElement("br");
			this.containerNode.appendChild(br);
		},
		_getMaxChildWidth: function () {
			var maxChildWidth = 0;
			array.forEach(this.getChildren(), function (child) {
				var mb = domGeometry.getMarginBox(child.domNode);
				if (mb.w > maxChildWidth) {
					maxChildWidth = mb.w;
				}
			}, this);
			//console.debug("maxChildWidth "+maxChildWidth);
			return maxChildWidth;
		}
	});

});
