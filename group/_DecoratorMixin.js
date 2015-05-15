define([ "dojo/_base/declare", "dojo/_base/lang", "dojo/aspect",
    "dijit/Tooltip", "dojo/i18n!../nls/messages", "dojo/dom-class"
], function (declare, lang, aspect, Tooltip, messages, domClass) {
// module:
//		gform/group/_DecoratorMixin
    return declare([  ], {
        // summary:
        //		Displays and manages an attribute's static and dynamic meta data. Should be mixed into Decorators.
        // description:
        //		This Mixin manages the label of an attribute. The attribute meta data needs to be provided in the	 			//		meta property. The modelHandle is in the property modelHandle.
        //		Also the following nodes for indicators need to be provided:  descriptionTooltipNode, errorTooltipNode and changesTooltipNode.
        //		This Mixin will update the indicators, the tooltips and their content on changes to the modelHandle's state and message meta data.
        //		Also this mixin emits value-change event when the model changes.


        baseClass: "Decorator",
        // meta: Object
        //		The attribute meta data
        meta: null,
        // modelHandle: Object
        //		The attribute modelHandle
        modelHandle: null,
        // messageWatch: Object
        //		the watchHandle for the message in modelHandle
        messageWatch: null,
        // valueWatch: Object
        //		the watchHandle for the value in modelHandle
        valueWatch: null,
        // changesTooltipNode:
        //		tooltip for change description will be attached here
        changesTooltipNode: null,
        // errorTooltipNode:
        //		tooltip for error message will be attached here
        errorTooltipNode: null,
        // descriptionTooltipNode:
        //		tooltip for description will be attached here
        descriptionTooltipNode: null,
        // changesTooltip:dijit/Tooltip
        //		tooltip for change description
        changesTooltip: null,
        startup: function () {
            this.inherited(arguments);
            if (this.modelHandle && typeof this.modelHandle.watch === "function") {
				this.own(this.modelHandle.watch("message", lang.hitch(this, "onMessageChange")));
				this.own(this.modelHandle.watch("oldValue", lang.hitch(this, "onOldValueChange")));
                this.own(this.modelHandle.watch("value", lang.hitch(this, "onModelValueChange")));
				this.own(this.modelHandle.watch("state", lang.hitch(this, "onStateChange")));

                // cascading changes observed instead of computedProperties
                this.own(aspect.after(this.modelHandle, "onChange", lang.hitch(this, "updateState")));
            } else {
                //console.log("modelHandle is null " + this.label);
            }
            if (this.meta.decoratorClasses) {
                domClass.add(this.domNode, this.meta.decoratorClasses);
            }
            if (this.descriptionTooltipNode) {
                if (this.meta.description) {
                    new Tooltip({
                        connectId: [this.descriptionTooltipNode],
                        label: this.meta.description
                    });
                } else {
                    this.descriptionTooltipNode.style.display = "none";
                }
            }
            this.errorTooltip = new Tooltip({
                connectId: [this.errorTooltipNode],
                label: ""
            });
            this.changesTooltip = new Tooltip({
                connectId: [this.changesTooltipNode],
                label: ""
            });
            this.updateState();
            this.changesTooltip.label = this.modelHandle.getChangeMessage();
            if (this.labelNode && this.meta.required && !this.meta.array) {
                var sup = document.createElement("sup");
				sup.setAttribute("class","required-asterisk");
                sup.innerHTML = "*";
                // TODO insert after label and not before errorTooltipNode
                this.labelNode.parentNode.insertBefore(sup, this.errorTooltipNode);
            }
            if (this.modelHandle) {
                // set message that existed before widget was displayed
                this.errorTooltip.label = this.modelHandle.message;
            }
            //var children = this.getChildrenToValidate();
            //this.singleNonValidatingChild=children.length==1 && !children[0].validate;
        },
        onValueChange: function (e) {
            if (e.src !== this) {
                this.updateState();
            }
        },
        onStateChange: function (e) {
            if (e.src !== this) {
                this.updateState();
            }
        },
        onModelValueChange: function (propName, old, nu) {
			if (this.singleNonValidatingChild && this.modelHandle.state !== "") {
                // value changes set state back to unvalidated
                this.modelHandle.set("state", "");
            }
            this.updateState();
            this.emit("value-changed", {src: this, oldValue: old, newValue: nu});
        },
        onOldValueChange: function (propName, old, nu) {
            this.updateState();
        },
        updateState: function () {
            if (!this.modelHandle) {
                return;
            }
            if (this.modelHandle.errorCount > 0) {
                this.changesTooltipNode.style.display = "none";
                this.errorTooltipNode.style.display = "";
                //this.set("state","Error");
            } else if (this.modelHandle.hasChanged()) {
                //this.set("state","Changed");
				this.changesTooltip.label = this.modelHandle.getChangeMessage();
                this.changesTooltipNode.style.display = "";
                this.errorTooltipNode.style.display = "none";
            } else {
                //this.set("state","");
                this.changesTooltipNode.style.display = "none";
                this.errorTooltipNode.style.display = "none";
            }
        },
        onMessageChange: function (propname, old, nu) {
            this.errorTooltip.label = nu;
        }
    });

});
