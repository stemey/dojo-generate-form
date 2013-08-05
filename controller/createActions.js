define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",

], function(declare, lang, array	){
// module:
//		gform/	controller/createActions

	
	var createActions=function(actionClasses, ctrl) {
		// summary:
		//		creates an array of buttons. Usually used to create a list of buttons below an editor.
		// actionClasses: array
		//		The array of action factories
		// ctrl: gform/controller/_CrudMixin
		//		the controller is set as a member of the actions
			 var buttons =array.map(actionClasses, function(ActionClass) {
				var action=new ActionClass();
				action.ctrl = ctrl;
				action.setup();
				return action.createButton();
			}, this);
			return buttons;
		}
	
	return createActions;


});
