define([
	"dojo/aspect",
	"dojox/mvc/equals"
], function (aspect, equals) {
// module:
//		gform/primitive/bindWidget

	var bindWidget = function (modelHandle, widget, widgetPropName) {
		// summary:
		//		bind a widget property of type Array to a modelHandle.
		// description:
		//		dojox.mvc.at does not provide a custom equals function for arrays yet. That is why we do it ourselves.
		// modelHandle: dojo/Stateful
		//		the modelHandle
		// widget: dijit/_WidgetBase
		//		the widget
		// equals: Function
		//		the equals operation
		widget.watch(widgetPropName, function (propName, old, nu) {
			if (!equals(old, nu) && !equals(nu, modelHandle.value)) {
				modelHandle.set("value", nu);
			}
		});
		var valueWatch = modelHandle.watch("value", function (propName, old, nu) {
			if (!equals(old, nu) && !equals(nu, widget[widgetPropName])) {
				widget.set(widgetPropName, nu);
			}
		});
		aspect.after(widget, "destroy", function () {
			valueWatch.remove();
		});
	};
	return bindWidget;
});
