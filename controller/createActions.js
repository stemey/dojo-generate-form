define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/array",

], function(declare, lang, array	){


	
	var createActions=function(actionClasses, ctrl) {	
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
