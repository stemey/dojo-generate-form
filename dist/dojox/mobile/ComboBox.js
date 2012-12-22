//>>built
define("dojox/mobile/ComboBox","dojo/_base/kernel,dojo/_base/declare,dojo/_base/lang,dojo/_base/window,dojo/dom-geometry,dojo/dom-style,dojo/window,dojo/touch,dijit/form/_AutoCompleterMixin,dijit/popup,./_ComboBoxMenu,./TextBox,./sniff".split(","),function(u,v,w,k,b,l,x,p,y,n,B,z,A){u.experimental("dojox.mobile.ComboBox");return v("dojox.mobile.ComboBox",[z,y],{dropDownClass:"dojox.mobile._ComboBoxMenu",selectOnClick:!1,autoComplete:!1,dropDown:null,maxHeight:-1,dropDownPosition:["below","above"],
_throttleOpenClose:function(){this._throttleHandler&&this._throttleHandler.remove();this._throttleHandler=this.defer(function(){this._throttleHandler=null},500)},_onFocus:function(){this.inherited(arguments);!this._opened&&!this._throttleHandler&&this._startSearchAll()},onInput:function(b){this._onKey(b);this.inherited(arguments)},_setListAttr:function(b){this._set("list",b)},closeDropDown:function(){this._throttleOpenClose();if(this.endHandler)this.disconnect(this.startHandler),this.disconnect(this.endHandler),
this.disconnect(this.moveHandler),clearInterval(this.repositionTimer),this.repositionTimer=this.endHandler=null;this.inherited(arguments);n.close(this.dropDown);this._opened=!1},openDropDown:function(){var m=!this._opened,d=this.dropDown,e=d.domNode,f=this.domNode,o=this;A("touch")&&k.global.scrollBy(0,b.position(f,!1).y);if(!this._preparedNode){this._preparedNode=!0;if(e.style.width)this._explicitDDWidth=!0;if(e.style.height)this._explicitDDHeight=!0}var a={display:"",overflow:"hidden",visibility:"hidden"};
if(!this._explicitDDWidth)a.width="";if(!this._explicitDDHeight)a.height="";l.set(e,a);a=this.maxHeight;if(-1==a)var a=x.getBox(),c=b.position(f,!1),a=Math.floor(Math.max(c.y,a.h-(c.y+c.h)));n.moveOffScreen(d);d.startup&&!d._started&&d.startup();c=b.position(this.dropDown.containerNode,!1);if(a&&c.h>a)c.h=a;c.w=Math.max(c.w,f.offsetWidth);b.setMarginBox(e,c);e=n.open({parent:this,popup:d,around:f,orient:this.dropDownPosition,onExecute:function(){o.closeDropDown()},onCancel:function(){o.closeDropDown()},
onClose:function(){o._opened=!1}});this._opened=!0;if(m){var i=!1,g=!1,h=!1,j=d.domNode.parentNode,m=b.position(f,!1),a=b.position(j,!1),q=a.x-m.x,r=a.y-m.y,s=-1,t=-1;this.startHandler=this.connect(k.doc.documentElement,p.press,function(a){h=g=!0;i=!1;s=a.clientX;t=a.clientY});this.moveHandler=this.connect(k.doc.documentElement,p.move,function(a){g=!0;if(a.touches)h=i=!0;else if(h&&(a.clientX!=s||a.clientY!=t))i=!0});this.clickHandler=this.connect(d.domNode,"onclick",function(){g=!0;h=i=!1});this.endHandler=
this.connect(k.doc.documentElement,"onmouseup",function(){this.defer(function(){g=!0;!i&&h&&this.closeDropDown();h=!1})});this.repositionTimer=setInterval(w.hitch(this,function(){if(g)g=!1;else{var a=b.position(f,!1),c=b.position(j,!1),d=c.x-a.x,a=c.y-a.y;(1<=Math.abs(d-q)||1<=Math.abs(a-r))&&l.set(j,{left:parseInt(l.get(j,"left"))+q-d+"px",top:parseInt(l.get(j,"top"))+r-a+"px"})}}),50)}return e},postCreate:function(){this.inherited(arguments);this.connect(this.domNode,"onclick","_onClick")},destroy:function(){this.repositionTimer&&
clearInterval(this.repositionTimer);this.inherited(arguments)},_onClick:function(){this._throttleHandler||(this.opened?this.closeDropDown():this._startSearchAll())}})});