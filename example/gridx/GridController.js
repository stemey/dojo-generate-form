define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/aspect",
	"gridx/Grid",
	'gridx/core/model/cache/Async',
	"gridx/modules/VirtualVScroller",
	"gridx/modules/ColumnResizer",
	"gridx/modules/SingleSort",
	"gridx/modules/Filter",
	'gridx/modules/Focus',
	'gridx/modules/RowHeader',
	'gridx/modules/select/Row',
	"dojo/store/Memory",
	"./AsyncMemory",
	"dojo/json",
	"dojo/text!./tablestructure.json",
	"dojo/text!./table.json",
	"dojo/text!./editorschema.json",
	"gform/controller/CrudController",
  "dijit/_WidgetBase", 
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./grid.html",
	"gform/Context",
	"gform/createLayoutEditorFactory",	
	"dijit/layout/BorderContainer",
	"dijit/layout/ContentPane",
	"dijit/Toolbar"
], function(declare, lang, aspect, Grid, Cache, 
	VirtualVScroller, ColumnResizer, SingleSort, Filter, Focus, RowHeader, RowSelect, Memory,
	 Store, json, tableStructure, tabledata, editorSchema, CrudController, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, Context, createEditorFactory){


	
return declare("gform.tests.gridx.GridController", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
		baseClass : "gformGridController",
		templateString : template,
		postCreate : function() {	
			var props={ id: "grid"};
			props.cacheClass=Cache;
			props.structure = dojo.fromJson(tableStructure);
			this.store = new Store({idProperty: 'id', data:dojo.fromJson(tabledata)});
			props.store = this.store;
			props.modules= [
				VirtualVScroller,
				{
					moduleClass: RowSelect,
					multiple: false,
					triggerOnCell: true,
				},
				RowHeader
			];
			this.grid = new Grid(props);
			window.grid=this.grid;

			this.ctx = new Context();
			this.schemaUrl = "myschema";
			this.ctx.schemaRegistry.register(this.schemaUrl, dojo.fromJson(editorSchema	));

		},
		startup: function() {
			this.inherited(arguments);
			this.grid.select.row.connect(this.grid.select.row, "onSelected",lang.hitch(this,"rowSelected"));
			this.gridContainer.addChild(this.grid);
			this.borderContainer.layout();
			this.editorController.setEditorFactory(createEditorFactory());
			this.editorController.setCtx(this.ctx);
			this.editorController.set("store", this.store);
			this.editorController.createNew(this.schemaUrl);
			aspect.before(this.store,"remove",lang.hitch(this,"_onDelete"));
		},
		rowSelected: function(e) {
			this.editorController.edit(e.id, this.schemaUrl);
		},
		createNew: function() {
			this.editorController.createNew(this.schemaUrl);
		},
		previous: function() {
			this._moveSelection(-1);
		},
		next: function() {
			this._moveSelection(1);
		},
		_onDelete: function() {
			this._moveSelection(1);
		},
		_moveSelection: function(delta) {
			var selectedId = this.grid.select.row.getSelected();
			if (selectedId) {
				var index = this.grid.model.idToIndex(selectedId);
				if (index<0) {
					return;
				}
				var nextId = this.grid.model.indexToId(index+delta);
				if (typeof nextId == "undefined") {
					return;
				}else{
					this.grid.select.row.deselectById(selectedId);
					this.grid.select.row.selectById(nextId);
				}
			}
		}	
	});


});
