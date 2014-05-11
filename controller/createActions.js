define([
	"dojo/_base/array"

], function (array) {
// module:
//		gform/	controller/createActions


	var createActions = function (actionOptions, ctrl) {
		// summary:
		//		creates an array of buttons. Usually used to create a list of buttons below an editor.
		// actionClasses: array
		//		The array of action factories
		// ctrl: gform/controller/_CrudMixin
		//		the controller is set as a member of the actions

		var buttons = [];
        actionOptions.forEach( function (actionOption) {
            var type = actionOption.type;
            if(typeof type == "string") {
                type=lang.getObject(type);
            }
			var action = new type(actionOption.props);
			action.ctrl = ctrl;
			action.setup();
			var button = action.createButton();
            if (button) {
                buttons.push(button);
            }
		}, this);
		return buttons;
	}

	return createActions;


});
