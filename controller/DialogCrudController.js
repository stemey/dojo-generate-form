define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-construct",
    "gform/createLayoutEditorFactory",
    "./_CrudMixin",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./dialogCrudController.html",
    "dojo/dom-geometry",
    "./actions/Save",
    "./actions/Discard",
    "./actions/Delete",
    "./createActions",
    "./ConfirmDialog",
    "dijit/layout/StackContainer",
    "dijit/layout/ContentPane",
    "dijit/ProgressBar",
    "dijit/Dialog",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane"
], function (declare, lang, array, domConstruct, createEditorFactory, _CrudMixin, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, template, domGeometry, Save, Discard, Delete, createActions) {
    // module:
    //		gform/controller/DialogCrudController


    return declare([  _CrudMixin, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        // summary:
        //		manages the display of an editor. Also manages operations on the editor's value by using a store and a set of actions.
        baseClass: "gformEditorController",
        // openerDialog:
        //      the dialog this controller is embedded in
        openerDialog:null,
        templateString: template,
        // actionContainer:
        //		the html element to append the action buttons to
        actionContainer: null,
        // actionClasses:
        //		array of Action modules
        actionClasses: [Save, Discard, Delete],
        barHeight: null,
        fullMb: null,
        constructor: function (props) {
            lang.mixin(this, props);
        },
        _onValueChange: function () {
        },
        setEditorFactory: function (ef) {
            this.editor.set("editorFactory", ef);
        },
        postCreate: function () {
            this.inherited(arguments);
            this.watch("state", lang.hitch(this, "_onStateChange"));
            this.editor.on("value-changed", lang.hitch(this, "_onValueChange"));
        },
        _resizeSecondRun: function () {
            this.fullMb = domGeometry.getMarginBox(this.domNode);
            var editorMb = domGeometry.getMarginBox(this.editor.domNode);
            this.barHeight = this.fullMb.h - editorMb.h;
            editorDim = {};
            editorDim.h = this.fullMb.h - this.barHeight;
            editorDim.w = this.fullMb.w;
            this.editor.resize(editorDim);
        },
        resize: function (dim, aftertimeout) {
            // summary:
            //		resizes the editor. Only the editor has scrollbars. The actions are displayed below.
            if (!this.fullMb || this.fullMb.h === this.barHeight) {
                this.fullMb = domGeometry.getMarginBox(this.domNode);
                var editorMb = domGeometry.getMarginBox(this.editor.domNode);
                this.barHeight = this.fullMb.h - editorMb.h;
            }
            var editorDim;
            if (dim) {
                editorDim = {};
                if (dim.h < this.fullMb.h) {
                    editorDim.h = dim.h - this.barHeight;
                } else {
                    editorDim.h = this.fullMb.h - this.barHeight;
                }
                if (dim.w < this.fullMb.w) {
                    editorDim.w = dim.w;
                } else {
                    editorDim.w = this.fullMb.w;
                }
                this.editor.resize(editorDim);
            } else if (this.fullMb.h !== this.barHeight) {
                // wait for children to layout and then recalculate space
                var me = this;
                setTimeout(function () {
                    me._resizeSecondRun();
                }, 100);
            }
        },
        _onLoadForEdit: function (entity) {
            // clear dim of editor after dialog has resized according to editor
            this.editor.dim = null;
            this.inherited(arguments);
        },
        _onLoadForEditAndSchema: function (results) {
            // clear dim of editor after dialog has resized according to editor
            this.editor.dim = null;
            this.inherited(arguments);
        },
        _addAction: function (button) {
            this.actionContainer.appendChild(button.domNode);
        },
        _removeActions: function () {
            domConstruct.empty(this.actionContainer);

        },
        onCloseDialog: function (closeFn) {
            // summary:
            //		called before dialog is closed. will check display if pending changes exist.
            // closeFn:
            //		if no pending changes or changes are discarded by user the function is called to continue closing.
            var me = this;
            this.barHeiht = null;
            this.fullMb = null;
            var openDialog = this._checkState(function (confirmed) {
                if (confirmed) {
                    me.editor.reset();
                    closeFn();
                }
            });
            if (!openDialog) {
                // if blur and changevent is fired after click, then the editor is changed at this oint. -> reset
                this.editor.reset();
                closeFn();
            }
        },
        close: function() {
            this.openerDialog.hide();
        }
    });


});
