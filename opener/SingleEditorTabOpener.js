define([
    "../controller/TabCrudController",
    "../createLayoutEditorFactory",
    "dijit/registry",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/aspect",
    "dijit/Dialog",
    "dijit/ProgressBar",
    "dijit/layout/ContentPane",
    "dijit/layout/StackContainer",
    "dijit/form/Button",
    "gform/util/restHelper"
], function (TabCrudController, createLayoutEditorFactory, registry, declare, lang, aspect) {
//  module:
//		gform/opener/SingleEditorTabOpener


    return declare([], {
        // summary:
        //		Opener that opens the new editor in a tab.

        // tabContainer:
        //		the tabContainer
        tabContainer: null,

        url2widget: {},

        controllerConfig: null,

        // editorFactory:
        //		the default editorFactory. Can be overriden by th eoptions passes to open/create methods.
        editorFactory: null,

        //  schemaRegistry:
        //		The schemaRegistry used to access the resources handled by the editor.
        ctx: null,
        // confirmDialog:
        //		the confirmDialog is used to display a message if the user aborts an editing session by closing the tab.
        confirmDialog: null,
        constructor: function (kwArgs) {
            lang.mixin(this, kwArgs);
        },
        /**
         *
         * @param props the general props for _CrudMixin
         * @param options params of editSingle,createSingle,..
         * @returns {TabCrudController}
         */
        createController: function (props, options) {
            var controller = new TabCrudController(props);
            lang.mixin(controller, this.controllerConfig);
            return controller;
        },
        closeById: function (evt) {
            var filtered = this.tabContainer.getChildren().filter(function (child) {
                var store = child.store;
                return store.name==evt.store && child.getId()==evt.id;
            })
            if (filtered && filtered.length == 1) {
                this.tabContainer.closeChild(filtered[0]);
            }
        },
        createSingle: function (options) {
            // summary:
            //		open the dialog to create a new resource.
            //  options:
            //		must provide the schemaUrl to load the gform schema from.
            //		Must also provide the url to the resource's collection.
            //		A callback which gets passed the new id may also be specified.  Options may provide EditorFactory.
            var props = {};
            var url = options.url;
            var store = this.ctx.getStore(url, {target: url});
            props.closable = true;
            props.editorFactory = this.editorFactory || options.editorFactory || createLayoutEditorFactory();
            props.store = store;
            props.container = this.tabContainer;
            props.dialog = this.confirmDialog;
            //props.ctx = this.ctx;
            var controller = this.createController(props, options);
            controller.setCtx(this.ctx);
            this.tabContainer.addChild(controller);
            this.tabContainer.selectChild(controller);
            var me = this;
            aspect.after(controller, "onCreate", function (result, args) {
                var singleUrl = url + "/" + args[0];
                me.url2widget[singleUrl] = controller;
                aspect.after(controller, "destroy", function () {
                    delete me.url2widget[singleUrl];
                });
            });
            if (options.typeProperty) {
                controller.createNewMulti(options.schemaUrls, options.typeProperty, options.callback, options.value);
            } else {
                controller.createNew(options.schemaUrl, options.callback, options.value);
            }
        },
        openSingle: function (options) {
            // summary:
            //		open the dialog to edit an existing resource.
            //  options:
            //		must provide the schemaUrl to load the gform schema from.
            //		Must also provide the url to the resource edited. Options may provide EditorFactory.
            var wid = "tab_editor_" + options.url + ":" + options.id;
            if (options.schemaUrl) {
                wid += ":" + options.schemaUrl;
            }
            var controller = registry.byId(wid);

            var singleUrl = options.url + "/" + options.id;

            if (controller) {
                this.tabContainer.selectChild(controller);
            } else if (this.url2widget[singleUrl]) {
                this.tabContainer.selectChild(this.url2widget[singleUrl]);
            } else {
                var props = {};
                var url = options.url;
                var id = options.id;
                var store = this.ctx.getStore(url, {target: url, idProperty: options.idProperty || "id"});
                props.id = wid;
                props.closable = true;
                props.editorFactory = this.editorFactory || options.editorFactory || createLayoutEditorFactory();
                props.store = store;
                props.container = this.tabContainer;
                props.dialog = this.confirmDialog;
                //props.ctx = this.ctx;
                controller = this.createController(props, options);
                controller.setCtx(this.ctx);

                this.tabContainer.addChild(controller);
                this.tabContainer.selectChild(controller);
                if (options.typeProperty) {
                    controller.editMulti(options.schemaUrls, options.typeProperty, id);
                } else {
                    controller.edit(id, options.schemaUrl);
                }
            }
        }
    });


});
