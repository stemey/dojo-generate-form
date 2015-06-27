define([  //
	"dojo/_base/declare",
	"dijit/form/Select",
	"dijit/PopupMenuItem",
	"dijit/Menu"
], function (declare, Select, PopupMenuItem, Menu) {

	return declare([Select], {
		groupItems: null,
		_setOptionsAttr: function(/*Array*/ options){
			this.groupItems={};
			this.inherited(arguments);
		},
		_getMenuItemForOption: function (option, submenu) {
			if (!submenu && option.group) {
				var groupItem;
				if (this.groupItems) {
					groupItem = this.groupItems[option.group];
				} else {
					this.groupItems = {};
				}
				var subMenu;
				if (!groupItem) {
					subMenu = new Menu({parentMenu: this.dropDown});
					groupItem = new PopupMenuItem({label: option.group, popup: subMenu});
					this.groupItems[option.group] = groupItem;
				} else {
					subMenu = groupItem.popup;
				}
				var item = this._getMenuItemForOption(option, true);
				subMenu.addChild(item);

				return groupItem;
			} else {
				return this.inherited(arguments);
			}
		}
	});

});
