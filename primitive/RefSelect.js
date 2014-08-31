define([ "dojo/_base/lang",
	"dojo/_base/declare",
	"dojo/aspect",
	"dojo/when",
	"dijit/_WidgetBase",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/text!./RefSelect.html",
	"dojo/i18n!../nls/messages"
], function (lang, declare, aspect, when, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, messages) {
//  module:
//		gform/primitive/RefSelect

	return declare([ _WidgetBase,
		_TemplatedMixin, _WidgetsInTemplateMixin ], {
		//  description:
		//		RefSelect displays a reference in a dijit/FilteringSelect. Editing the selected reference in
		//		another editor is supported via its opener. Creating a new entity and associating it
		//		with the current attribute is supported in the same way. 
		constructor: function (kwargs) {
			lang.mixin(this, kwargs);
		},
		templateString: template,
		// opener:
		//		the opener manages the opening of another editor.
		opener: null,

        // openerParams:
        //      single typed: schemaUrl and editorFactory
        //      multi typed: schemaUrls, typeProperty and editorFactory
        openerParams:null,
		// filteringSelect:
		//		the FilteringSelect.
		filteringSelect: null,
		// editorFactory:
		//		the editorFctory is passed to the opener.
		editorFactory: null,
		// selectContainer:
		//		the container where the FilteringSelect is placed.
		selectContainer: null,
		// meta:
		//		the attribute meta data.
		meta: null,
		// editButton:
		//		the opener manages the opening of another editor.
		editButton: null,
		// targetCreatable:
		//		if a button to create a target should be displayed.
		targetCreatable: false,
		postCreate: function () {
			this.inherited(arguments);
			this.editButton.on("click", lang.hitch(this, "openref"));
			this.editButton.set("label", messages.editButtonLabel);
			this.createButton.on("click", lang.hitch(this, "createref"));
			this.createButton.set("label", messages.createButtonLabel);
			this.filteringSelect.watch("value", lang.hitch(this, "updateState"));
			this.filteringSelect.watch("state", lang.hitch(this, "updateState"));
			if (!this.targetCreatable) {
				this.createButton.domNode.style.display = "none";
			}
			var select = this.filteringSelect;
			this.storeListener = aspect.after(select.store, "put", function (result, args) {
				when(result).then(function (id) {
					var entity = args[0];
					if (id+"" === "" + select.get("value")) {
						select.set("item", entity);
					}
				});
				return result;
			});
		},
		startup: function () {
			this.filteringSelect.placeAt(this.selectContainer);
			this.filteringSelect.startup();
			this.inherited(arguments);
			this.updateState();
		},
		updateState: function () {
			//  description:
			//		updates the button state.
			var editPossible = this.filteringSelect.state !== "Error" && !!this.filteringSelect.value;
			this.editButton.set("disabled", !editPossible);
		},
		openref: function () {
			//  description:
			//		open the selected reference in a separate editor.
			var ref = this.filteringSelect.get("value");
			//var url = (this.meta.url || "") + "/" + ref;
            var params = {};
            lang.mixin(params, this.openerParams);
            params.url=this.meta.url;
            params.id=ref;

			this.opener.openSingle(params);
		},
		createref: function () {
			//  description:
			//		open a new reference in a separate editor.

            var params = {};
            lang.mixin(params, this.openerParams);
            params.url= this.meta.url;
            params.callback= lang.hitch(this, "onCreated");
			this.opener.createSingle(params);
		},
		onCreated: function (id) {
			//  description:
			//		called when a new entity was created and should be asscoiated with this attribute.
			//  id:
			//		the id of the newly created entity.
			this.filteringSelect.set("value", "" + id);
		},
		destroy: function () {
			this.inherited(arguments);
			this.storeListener.remove();
		}
	});

});
