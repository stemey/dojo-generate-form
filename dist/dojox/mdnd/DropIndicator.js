//>>built
define("dojox/mdnd/DropIndicator",["dojo/_base/kernel","dojo/_base/declare","dojo/dom-class","dojo/dom-construct","./AreaManager"],function(b,d,e,f){b=d("dojox.mdnd.DropIndicator",null,{node:null,constructor:function(){var a=document.createElement("div"),c=document.createElement("div");a.appendChild(c);e.add(a,"dropIndicator");this.node=a},place:function(a,c,b){if(b)this.node.style.height=b.h+"px";try{return c?a.insertBefore(this.node,c):a.appendChild(this.node),this.node}catch(d){return null}},remove:function(){if(this.node)this.node.style.height=
"",this.node.parentNode&&this.node.parentNode.removeChild(this.node)},destroy:function(){this.node&&(this.node.parentNode&&this.node.parentNode.removeChild(this.node),f.destroy(this.node),delete this.node)}});dojox.mdnd.areaManager()._dropIndicator=new dojox.mdnd.DropIndicator;return b});