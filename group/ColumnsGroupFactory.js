define([
	"dojo/_base/declare",
	"./GroupFactory",
	"./ColumnsGroup"

], function (declare, GroupFactory, ColumnsGroup) {
// module:
//			gform/ColumnsGroupFactory
	return declare([GroupFactory], {
		// summary:
		//		the column group arranges its child attributes in columns using ./ColumnsGroup.

		id: "columnsgroup",
		createWidget: function (group) {
			var pane = new ColumnsGroup({meta: group});
			return pane;
		}
	});
});
