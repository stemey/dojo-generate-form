require([
	"dojo/_base/declare",
	"gridx/Grid",
	'gridx/core/model/cache/Sync',
	"gridx/modules/VirtualVScroller",
	"gridx/modules/ColumnResizer",
	"gridx/modules/SingleSort",
	"gridx/modules/Filter",
	"dojo/store/Memory",
	"dojo/json",
	"dojo/text!./tablestructure.json",
	"dojo/text!./table.json",
  "dijit/_WidgetBase", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./grid.html",
	'gridx/tests/support/data/MusicData',
	'gridx/tests/support/stores/Memory',
], function(declare, Grid, Cache, 
	VirtualVScroller, ColumnResizer, SingleSort, 
	Filter, Store, json, tableStructure, tabledata, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, dataSource, storeFactory){


return function() {
			var store = storeFactory({
				dataSource: dataSource,
				size: 100
			});
			var layout = dataSource.layouts[0];
			var props={ id: "grid"};
			props.cacheClass=Cache;
			props.structure = layout;//dojo.fromJson(tableStructure);
			props.store = store;//new Store({data:dojo.fromJson(tabledata)});
			props.modules= [
				VirtualVScroller
			];
			var grid = new Grid(props);
			grid.placeAt("gridContainer");
			grid.startup();
	} 

});

