define([ 
    	"dojo/_base/array",
    	"dojo/_base/lang",
    	"dojo/_base/declare",
    	"dojo/dom-class",
"dojox/mvc/WidgetList" ], function(array,lang,declare, domClass, WidgetList) {

	return declare("gform.TableWidgetList", [ WidgetList ], {
		buildRendering : function() {
			// summary:
			//		Construct the UI for this widget, setting this.domNode.
			//		Most widgets will mixin `dijit._TemplatedMixin`, which implements this method.
			// tags:
			//		protected

			if (!this.domNode) {
				// Create root node if it wasn't created by _Templated
				this.domNode = this.srcNodeRef || this.ownerDocument.createElement("tbody");
				domClass.add(this.domNode, "dojoDndContainer");
			}
			this.inherited(arguments);

		}

	})
});
