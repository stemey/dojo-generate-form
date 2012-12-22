//>>built
define("dojox/charting/plot3d/Cylinders",["dojox/gfx3d/matrix","dojo/_base/declare","dojo/_base/Color","dojo/_base/kernel","./Base"],function(k,e,l,m,n){return e("dojox.charting.plot3d.Cylinders",n,{constructor:function(b,d,a){this.depth="auto";this.gap=0;this.data=[];this.material={type:"plastic",finish:"shiny",color:"lime"};this.outline=null;if(a){if("depth"in a)this.depth=a.depth;if("gap"in a)this.gap=a.gap;if("material"in a)b=a.material,"string"==typeof b||b instanceof l?this.material.color=b:
this.material=b;if("outline"in a)this.outline=a.outline}},getDepth:function(){if("auto"==this.depth){var b=this.width;this.data&&this.data.length&&(b/=this.data.length);return b-2*this.gap}return this.depth},generate:function(b,d){if(!this.data)return this;for(var a=this.width/this.data.length,f=0,g=this.height,c=this.data,e=Math.max,h=void 0,c="string"==typeof c?c.split(""):c,h=h||m.global,i=c[0],j=1;j<c.length;i=e.call(h,i,c[j++]));g/=i;if(!d)d=b.view;for(c=0;c<this.data.length;++c,f+=a)d.createCylinder({center:{x:f+
a/2,y:0,z:0},radius:a/2-this.gap,height:this.data[c]*g}).setTransform(k.rotateXg(-90)).setFill(this.material).setStroke(this.outline)}})});