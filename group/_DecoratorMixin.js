define([ "dojo/_base/declare", "dojo/_base/lang",
		"dijit/Tooltip","./_GroupMixin"
], function(declare, lang,	Tooltip,_GroupMixin) {

	return declare("gform._DecoratorMixin",[ _GroupMixin ], {
		baseClass:"Decorator",
		postCreate: function() {
			this.inherited(arguments);
			if (this.modelHandle && typeof this.modelHandle.watch == "function") {
				this.modelHandle.watch("message",lang.hitch(this,"onMessageChange"));
				this.modelHandle.watch("value",lang.hitch(this,"onValueChange"));
				this.on("valid-changed",lang.hitch(this,"onValidChange"));
			}else{
				console.log("modelHandle is null "+this.label);
			}
			if (this.descriptionTooltipNode) {
				new Tooltip({
				      connectId: [this.descriptionTooltipNode],
				      label: this.meta.description
				  });
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
			
			
		},
		startup: function() {
			this.inherited(arguments);
		},
		onValueChange: function(a,old,nu) {
			this.changesTooltip.label="was "+this.modelHandle.oldValue
			this.updateState();
		},
		onValidChange: function(e	) {
			this.updateState();
		},
		isValidationContainer:true,
		updateState: function() {
			if (!this.modelHandle) {
				return;
			}
			if (this.modelHandle.valid) {
				if (this.modelHandle.oldValue!=this.modelHandle.value	) {
					this.set("state","Changed");
					this.changesTooltipNode.style.display="";
				}else{
					this.set("state","");
					this.changesTooltipNode.style.display="none";
				}
				this.errorTooltipNode.style.display="none";
			}else{
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
