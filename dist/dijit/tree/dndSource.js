//>>built
define("dijit/tree/dndSource","dojo/_base/array,dojo/_base/connect,dojo/_base/declare,dojo/dom-class,dojo/dom-geometry,dojo/_base/lang,dojo/on,dojo/touch,dojo/topic,dojo/dnd/Manager,./_dndSelector".split(","),function(m,q,r,l,s,j,u,v,k,i,t){return r("dijit.tree.dndSource",t,{isSource:!0,accept:["text","treeNode"],copyOnly:!1,dragThreshold:5,betweenThreshold:0,generateText:!0,constructor:function(a,h){h||(h={});j.mixin(this,h);var b=h.accept instanceof Array?h.accept:["text","treeNode"];this.accept=
null;if(b.length){this.accept={};for(var d=0;d<b.length;++d)this.accept[b[d]]=1}this.mouseDown=this.isDragging=!1;this.targetBox=this.targetAnchor=null;this.dropPosition="";this._lastY=this._lastX=0;this.sourceState="";this.isSource&&l.add(this.node,"dojoDndSource");this.targetState="";this.accept&&l.add(this.node,"dojoDndTarget");this.topics=[k.subscribe("/dnd/source/over",j.hitch(this,"onDndSourceOver")),k.subscribe("/dnd/start",j.hitch(this,"onDndStart")),k.subscribe("/dnd/drop",j.hitch(this,"onDndDrop")),
k.subscribe("/dnd/cancel",j.hitch(this,"onDndCancel"))]},checkAcceptance:function(){return!0},copyState:function(a){return this.copyOnly||a},destroy:function(){this.inherited(arguments);for(var a;a=this.topics.pop();)a.remove();this.targetAnchor=null},_onDragMouse:function(a,h){var b=i.manager(),d=this.targetAnchor,c=this.current,e=this.dropPosition,f="Over";if(c&&0<this.betweenThreshold){if(!this.targetBox||d!=c)this.targetBox=s.position(c.rowNode,!0);a.pageY-this.targetBox.y<=this.betweenThreshold?
f="Before":a.pageY-this.targetBox.y>=this.targetBox.h-this.betweenThreshold&&(f="After")}if(h||c!=d||f!=e){d&&this._removeItemClass(d.rowNode,e);c&&this._addItemClass(c.rowNode,f);if(c)if(c==this.tree.rootNode&&"Over"!=f)b.canDrop(!1);else{d=!1;if(b.source==this)for(var g in this.selection)if(this.selection[g].item===c.item){d=!0;break}d?b.canDrop(!1):this.checkItemAcceptance(c.rowNode,b.source,f.toLowerCase())&&!this._isParentChildDrop(b.source,c.rowNode)?b.canDrop(!0):b.canDrop(!1)}else b.canDrop(!1);
this.targetAnchor=c;this.dropPosition=f}},onMouseMove:function(a){if(!(this.isDragging&&"Disabled"==this.targetState)){this.inherited(arguments);var h=i.manager();if(this.isDragging)this._onDragMouse(a);else if(this.mouseDown&&this.isSource&&(Math.abs(a.pageX-this._lastX)>=this.dragThreshold||Math.abs(a.pageY-this._lastY)>=this.dragThreshold)){var b=this.getSelectedTreeNodes();if(b.length){if(1<b.length){var d=this.selection,c=0,e=[],f,g;a:for(;f=b[c++];){for(g=f.getParent();g&&g!==this.tree;g=g.getParent())if(d[g.id])continue a;
e.push(f)}b=e}b=m.map(b,function(a){return a.domNode});h.startDrag(this,b,this.copyState(q.isCopyKey(a)));this._onDragMouse(a,!0)}}}},onMouseDown:function(a){this.mouseDown=!0;this.mouseButton=a.button;this._lastX=a.pageX;this._lastY=a.pageY;this.inherited(arguments)},onMouseUp:function(a){if(this.mouseDown)this.mouseDown=!1,this.inherited(arguments)},onMouseOut:function(){this.inherited(arguments);this._unmarkTargetAnchor()},checkItemAcceptance:function(){return!0},onDndSourceOver:function(a){this!=
a?(this.mouseDown=!1,this._unmarkTargetAnchor()):this.isDragging&&i.manager().canDrop(!1)},onDndStart:function(a,h,b){this.isSource&&this._changeState("Source",this==a?b?"Copied":"Moved":"");this._changeState("Target",this.checkAcceptance(a,h)?"":"Disabled");this==a&&i.manager().overSource(this);this.isDragging=!0},itemCreator:function(a){return m.map(a,function(a){return{id:a.id,name:a.textContent||a.innerText||""}})},onDndDrop:function(a,h,b){if("Over"==this.containerState){var d=this.tree,c=d.model,
e=this.targetAnchor;this.isDragging=!1;var f,g,i;f=e&&e.item||d.item;"Before"==this.dropPosition||"After"==this.dropPosition?(f=e.getParent()&&e.getParent().item||d.item,g=e.getIndexInParent(),"After"==this.dropPosition?(g=e.getIndexInParent()+1,i=e.getNextSibling()&&e.getNextSibling().item):i=e.item):f=e&&e.item||d.item;var j;m.forEach(h,function(d,k){var l=a.getItem(d.id);if(-1!=m.indexOf(l.type,"treeNode"))var n=l.data,o=n.item,p=n.getParent().item;a==this?("number"==typeof g&&f==p&&n.getIndexInParent()<
g&&(g-=1),c.pasteItem(o,p,f,b,g,i)):c.isItem(o)?c.pasteItem(o,p,f,b,g,i):(j||(j=this.itemCreator(h,e.rowNode,a)),c.newItem(j[k],f,g,i))},this);this.tree._expandNode(e)}this.onDndCancel()},onDndCancel:function(){this._unmarkTargetAnchor();this.mouseDown=this.isDragging=!1;delete this.mouseButton;this._changeState("Source","");this._changeState("Target","")},onOverEvent:function(){this.inherited(arguments);i.manager().overSource(this)},onOutEvent:function(){this._unmarkTargetAnchor();var a=i.manager();
this.isDragging&&a.canDrop(!1);a.outSource(this);this.inherited(arguments)},_isParentChildDrop:function(a,h){if(!a.tree||a.tree!=this.tree)return!1;for(var b=a.tree.domNode,d=a.selection,c=h.parentNode;c!=b&&!d[c.id];)c=c.parentNode;return c.id&&d[c.id]},_unmarkTargetAnchor:function(){if(this.targetAnchor)this._removeItemClass(this.targetAnchor.rowNode,this.dropPosition),this.dropPosition=this.targetBox=this.targetAnchor=null},_markDndStatus:function(a){this._changeState("Source",a?"Copied":"Moved")}})});