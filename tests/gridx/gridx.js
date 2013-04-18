require([
	"dojo/_base/declare",
	"gridx/Grid",
	'gridx/core/model/cache/Sync',
	"gridx/modules/VirtualVScroller",
	'gridx/tests/support/data/MusicData',
	'gridx/tests/support/stores/Memory',
], function(declare, Grid, Cache, 
	VirtualVScroller, dataSource, storeFactory){


var x= function() {
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
return x;

});

