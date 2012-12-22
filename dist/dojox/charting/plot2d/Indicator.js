//>>built
define("dojox/charting/plot2d/Indicator","dojo/_base/lang,dojo/_base/array,dojo/_base/declare,./CartesianBase,./_PlotEvents,./common,../axis2d/common,dojox/gfx,dojox/lang/utils,dojox/gfx/fx".split(","),function(o,B,D,E,F,r,G,s,C,H){var I=function(c){var a=c.declaredClass,e;if(-1!=a.indexOf("svg"))try{return o.mixin({},c.rawNode.getBBox())}catch(b){}else{if(-1!=a.indexOf("vml")){var d=c.rawNode,f=d.style.display;d.style.display="inline";a=s.pt2px(parseFloat(d.currentStyle.width));e=s.pt2px(parseFloat(d.currentStyle.height));
a={x:0,y:0,width:a,height:e};v(c,a);d.style.display=f;return a}if(-1!=a.indexOf("silverlight"))return v(c,{width:c.rawNode.actualWidth,height:c.rawNode.actualHeight},0.75);if(c.getTextWidth)return a=c.getTextWidth(),d=c.getFont(),e=s.normalizedLength(d?d.size:s.defaultFont.size),a={width:a,height:e},v(c,a,0.75),a}return null},v=function(c,a,e){var b=a.width,d=a.height,c=c.getShape();switch(c.align){case "end":a.x=c.x-b;break;case "middle":a.x=c.x-b/2;break;default:a.x=c.x}a.y=c.y-d*(e||1);return a};
return D("dojox.charting.plot2d.Indicator",[E,F],{defaultParams:{vertical:!0,fixed:!0,precision:0,lines:!0,labels:"line",markers:!0},optionalParams:{lineStroke:{},outlineStroke:{},shadowStroke:{},lineFill:{},stroke:{},outline:{},shadow:{},fill:{},fillFunc:null,labelFunc:null,font:"",fontColor:"",markerStroke:{},markerOutline:{},markerShadow:{},markerFill:{},markerSymbol:"",values:[],offset:{},start:!1,animate:!1},constructor:function(c,a){this.opt=o.clone(this.defaultParams);C.updateWithObject(this.opt,
a);if("number"==typeof a.values)a.values=[a.values];C.updateWithPattern(this.opt,a,this.optionalParams);this.animate=this.opt.animate},render:function(c,a){if(this.zoom)return this.performZoom(c,a);if(!this.isDirty())return this;this.cleanGroup(null,!0);if(!this.opt.values)return this;this._updateIndicator();return this},_updateIndicator:function(){var c=this.chart.theme,a=this._hAxis.name,e=this._vAxis.name,b=this._hAxis.getScaler().bounds,d=this._vAxis.getScaler().bounds,f={};f[a]=b.from;f[e]=d.from;
var o=this.toPage(f);f[a]=b.to;f[e]=d.to;var y=this.toPage(f),k=this.events(),b=B.map(this.opt.values,function(b,c){return this._renderIndicator(b,c,a,e,o,y,k,this.animate)},this),d=b.length;if("trend"==this.opt.labels){var f=this.opt.vertical,g=this._data[0][0],i=this._data[d-1][0]-g,g=this.opt.labelFunc?this.opt.labelFunc(-1,this.values,this._data,this.opt.fixed,this.opt.precision):r.getLabel(i,this.opt.fixed,this.opt.precision)+" ("+r.getLabel(100*i/g,!0,2)+"%)";this._renderText(this.getGroup(),
g,this.chart.theme,f?(b[0].x+b[d-1].x)/2:b[1].x,f?b[0].y:(b[1].y+b[d-1].y)/2,-1,this.opt.values,this._data)}if((c=void 0!=this.opt.lineFill?this.opt.lineFill:c.indicator.lineFill)&&1<d)f=Math.min(b[0].x1,b[d-1].x1),g=Math.min(b[0].y1,b[d-1].y1),this.getGroup().createRect({x:f,y:g,width:Math.max(b[0].x2,b[d-1].x2)-f,height:Math.max(b[0].y2,b[d-1].y2)-g}).setFill(c).moveToBack()},_renderIndicator:function(c,a,e,b,d,f,s,y){var k=this.chart.theme,g=this.chart.getCoords(),i=this.opt.vertical,p=this.getGroup().createGroup(),
h={};h[e]=i?c:0;h[b]=i?0:c;var h=this.toPage(h),l=i?h.x>=d.x&&h.x<=f.x:h.y>=f.y&&h.y<=d.y,z=h.x-g.x,A=h.y-g.y,j=i?z:d.x-g.x,q=i?d.y-g.y:A,w=i?j:f.x-g.x,t=i?f.y-g.y:q;if(this.opt.lines&&l){var n=this.opt.hasOwnProperty("lineShadow")?this.opt.lineShadow:k.indicator.lineShadow,u=this.opt.hasOwnProperty("lineStroke")?this.opt.lineStroke:k.indicator.lineStroke,m=this.opt.hasOwnProperty("lineOutline")?this.opt.lineOutline:k.indicator.lineOutline;n&&p.createLine({x1:j+n.dx,y1:q+n.dy,x2:w+n.dx,y2:t+n.dy}).setStroke(n);
if(m)m=r.makeStroke(m),m.width=2*m.width+(u?u.width:0),p.createLine({x1:j,y1:q,x2:w,y2:t}).setStroke(m);p.createLine({x1:j,y1:q,x2:w,y2:t}).setStroke(u)}var v;if(this.opt.markers&&l){var x=this._data[a];x&&(v=B.map(x,function(a){h[e]=i?c:a;h[b]=i?a:c;h=this.toPage(h);if(i?h.y<=d.y&&h.y>=f.y:h.x>=d.x&&h.x<=f.x){z=h.x-g.x;A=h.y-g.y;var j=this.opt.markerSymbol?this.opt.markerSymbol:k.indicator.markerSymbol,l="M"+z+" "+A+" "+j;n=void 0!=this.opt.markerShadow?this.opt.markerShadow:k.indicator.markerShadow;
u=void 0!=this.opt.markerStroke?this.opt.markerStroke:k.indicator.markerStroke;m=void 0!=this.opt.markerOutline?this.opt.markerOutline:k.indicator.markerOutline;n&&p.createPath("M"+(z+n.dx)+" "+(A+n.dy)+" "+j).setFill(n.color).setStroke(n);if(m)m=r.makeStroke(m),m.width=2*m.width+(u?u.width:0),p.createPath(l).setStroke(m);j=p.createPath(l);l=this._shapeFill(void 0!=this.opt.markerFill?this.opt.markerFill:k.indicator.markerFill,j.getBoundingBox());j.setFill(l).setStroke(u)}return a},this))}x=this.opt.start?
{x:i?j:j,y:i?q:t}:{x:i?j:w,y:i?t:q};this.opt.labels&&"trend"!=this.opt.labels&&l&&(this.opt.labelFunc?l=this.opt.labelFunc(a,this.opt.values,this._data,this.opt.fixed,this.opt.precision,this.opt.labels):"markers"==this.opt.labels?(l=B.map(v,function(a){return r.getLabel(a,this.opt.fixed,this.opt.precision)},this),l="[ "+l.join(", ")+" ]"):l=r.getLabel(c,this.opt.fixed,this.opt.precision),this._renderText(p,l,k,x.x,x.y,a,this.opt.values,this._data));s&&this._connectEvents({element:"indicator",run:this.run?
this.run[a]:void 0,shape:p,value:c});y&&this._animateIndicator(p,i,i?q:j,i?q+t:j+w,y);return o.mixin(x,{x1:j,y1:q,x2:w,y2:t})},_animateIndicator:function(c,a,e,b,d){H.animateTransform(o.delegate({shape:c,duration:1200,transform:[{name:"translate",start:a?[0,e]:[e,0],end:[0,0]},{name:"scale",start:a?[1,1/b]:[1/b,1],end:[1,1]},{name:"original"}]},d)).play()},clear:function(){this.inherited(arguments);this._data=[]},addSeries:function(c){this.inherited(arguments);this._data.push(c.data)},_renderText:function(c,
a,e,b,d,f,o,s){this.opt.offset&&(b+=this.opt.offset.x,d+=this.opt.offset.y);a=G.createText.gfx(this.chart,c,b,d,"middle",a,this.opt.font?this.opt.font:e.indicator.font,this.opt.fontColor?this.opt.fontColor:e.indicator.fontColor);b=I(a,a.getShape().text);b.x-=2;b.y-=1;b.width+=4;b.height+=2;b.r=this.opt.radius?this.opt.radius:e.indicator.radius;var k=void 0!=this.opt.shadow?this.opt.shadow:e.indicator.shadow,d=void 0!=this.opt.stroke?this.opt.stroke:e.indicator.stroke,g=void 0!=this.opt.outline?this.opt.outline:
e.indicator.outline;k&&c.createRect(b).setFill(k.color).setStroke(k);if(g)g=r.makeStroke(g),g.width=2*g.width+(d?d.width:0),c.createRect(b).setStroke(g);e=this.opt.fillFunc?this.opt.fillFunc(f,o,s):void 0!=this.opt.fill?this.opt.fill:e.indicator.fill;c.createRect(b).setFill(this._shapeFill(e,b)).setStroke(d);a.moveToFront()},getSeriesStats:function(){return o.delegate(r.defaultStats)}})});