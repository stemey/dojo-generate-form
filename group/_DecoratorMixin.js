define([ "dojo/_base/declare", "dojo/_base/lang",
		"dijit/Tooltip","./_GroupMixin","../hasChanged", "dojo/i18n", "dojo/i18n!../nls/messages"
], function(declare, lang,	Tooltip,_GroupMixin, hasChanged, i18n, messages) {
// module:
//		gform/group/_DecoratorMixin	
	return declare("gform.group._DecoratorMixin",[ _GroupMixin ], {
		// summary:
		//		This Mixin manages the label of an attribute. The attribute meta data needs to be provided in the	 			//		meta property. The modelHandle is in the property modelHandle. 
		//		Also the following nodes for indicators need to be provided:  descriptionTooltipNode, errorTooltipNode and changesTooltipNode. 
		//		This Mixin will update the indicators, the tooltips and their content on changes to the modelHandle's state and message meta data.
		// Also this mixin emits value-change event when the model changes.
		 

		baseClass:"Decorator",
		messageWatch : null,
		valueWatch : null,
		postCreate: function() {
			this.inherited(arguments);
			if (this.modelHandle && typeof this.modelHandle.watch == "function") {
				this.messageWatch=this.modelHandle.watch("message",lang.hitch(this,"onMessageChange"));
				this.oldValueWatch=this.modelHandle.watch("oldValue",lang.hitch(this,"onOldValueChange"));
				this.valueWatch=this.modelHandle.watch("value",lang.hitch(this,"onModelValueChange"));
				this.on("value-changed",lang.hitch(this,"onValueChange"));
				this.on("state-changed",lang.hitch(this,"onStateChange"));
			}else{
				console.log("modelHandle is null "+this.label);
			}
			if (this.descriptionTooltipNode) {
				if (this.meta.description) {
				new Tooltip({
				      connectId: [this.descriptionTooltipNode],
				      label: this.meta.description
				  });
				} else {
					this.descriptionTooltipNode.style.display="none";
				}
			}
			this.errorTooltip=new Tooltip({
		        connectId: [this.errorTooltipNode],
		        label: ""
		    });
			this.changesTooltip=new Tooltip({
		        connectId: [this.changesTooltipNode],
		        label: ""
		    });
			this.updateState();
			this.changesTooltip.label=this.getOldValueMessage(this.modelHandle.oldValue);
			if (this.labelNode && this.meta.required && !this.meta.array) {
				var sup = document.createElement("sup");
				sup.innerHTML="*";
				// TODO insert after label and not before errorTooltipNode
				this.labelNode.parentNode.insertBefore(sup,this.errorTooltipNode);
			}
		},
		destroy: function() {
			this.inherited(arguments);
			if (this.modelHandle) {
				this.oldValueWatch.remove();
				this.messageWatch.remove();
				this.valueWatch.remove();
			}
		},

		startup: function() {
			this.inherited(arguments);
		},
		
		onValueChange: function(e) {
			if (e.src!=this) {
				this.updateState();
			}
		},
		
		onModelValueChange: function(propName,old,nu) {
			this.updateState();
			this.emit("value-changed",{src:this,oldValue:old,newValue:nu});
		},
		getOldValueMessage: function(old) {
			var message;
			if (old==null || typeof old == "undefined") {
				message = messages["oldValueWasNull"];
			} else {
				message = lang.replace(messages["oldValueChanged"],{oldValue:dojo.toJson(old,true)});
			}
			return message;
		},
		onOldValueChange: function(propName,old,nu) {
			this.changesTooltip.label=this.getOldValueMessage(nu);
			this.updateState();
		},

		onStateChange: function(e	) {
			this.updateState();
		},
		
		updateState: function() {
			if (!this.modelHandle) {
				return;
			}
			if (this.modelHandle.state=="") {
				if (hasChanged(this.modelHandle)) {
					this.set("state","Changed");
					this.changesTooltipNode.style.display="";
				}else{
					this.set("state","");
					this.changesTooltipNode.style.display="none";
				}
				this.errorTooltipNode.style.display="none";
			}else if (this.modelHandle.state=="Error"){
				this.changesTooltipNode.style.display="none";
				this.errorTooltipNode.style.display="";
				this.set("state","Error");
			}
		},	
		
		onMessageChange: function(a,old,nu) {
			this.errorTooltip.label=nu;
		}
	});

});
