define([
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
	"dojo/text!./grid.html"
], function(declare, Grid, Cache, 
	VirtualVScroller, ColumnResizer, SingleSort, 
	Filter, Store, json, tableStructure, tabledata, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template){


	
return declare("gform.tests.gridx.GridController", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		baseClass : "gformGridController",
		templateString : template,
		postCreate : function() {	
			var props={ id: "grid"};
			props.cacheClass=Cache;
			props.structure = dojo.fromJson(tableStructure);
			props.store = new Store({data:dojo.fromJson(tabledata)});
			props.modules= [
				VirtualVScroller
			];
			this.grid = new Grid(props);
			window.grid=this.grid;
		},
		startup: function() {
			this.inherited(arguments);
			this.grid.placeAt(this.gridContainer);
			this.grid.startup();
		}
	});


});
