//>>built
define("dojox/charting/plot2d/Candlesticks","dojo/_base/lang,dojo/_base/declare,dojo/_base/array,./CartesianBase,./_PlotEvents,./common,dojox/lang/functional,dojox/lang/functional/reversed,dojox/lang/utils,dojox/gfx/fx".split(","),function(o,u,z,v,w,A,E,F,r,G){var H=F.lambda("item.purgeGroup()");return u("dojox.charting.plot2d.Candlesticks",[v,w],{defaultParams:{gap:2,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(a,
b){this.opt=o.clone(this.defaultParams);r.updateWithObject(this.opt,b);r.updateWithPattern(this.opt,b,this.optionalParams);this.animate=this.opt.animate},collectStats:function(a){for(var b=o.delegate(A.defaultStats),g=0;g<a.length;g++){var c=a[g];if(c.data.length){var d=b.vmin,s=b.vmax;(!("ymin"in c)||!("ymax"in c))&&z.forEach(c.data,function(a,d){if(null!==a){var c=a.x||d+1;b.hmin=Math.min(b.hmin,c);b.hmax=Math.max(b.hmax,c);b.vmin=Math.min(b.vmin,a.open,a.close,a.high,a.low);b.vmax=Math.max(b.vmax,
a.open,a.close,a.high,a.low)}});if("ymin"in c)b.vmin=Math.min(d,c.ymin);if("ymax"in c)b.vmax=Math.max(s,c.ymax)}}return b},getSeriesStats:function(){var a=this.collectStats(this.series);a.hmin-=0.5;a.hmax+=0.5;return a},render:function(a,b){if(this.zoom&&!this.isDataDirty())return this.performZoom(a,b);this.resetEvents();this.dirty=this.isDirty();var g;if(this.dirty)z.forEach(this.series,H),this._eventSeries={},this.cleanGroup(),g=this.getGroup(),E.forEachRev(this.series,function(a){a.cleanGroup(g)});
var c=this.chart.theme,d,s,o=this._hScaler.scaler.getTransformerFromModel(this._hScaler),p=this._vScaler.scaler.getTransformerFromModel(this._vScaler),r=this.events();d=A.calculateBarSize(this._hScaler.bounds.scale,this.opt);s=d.gap;d=d.size;for(var x=this.series.length-1;0<=x;--x){var f=this.series[x];if(!this.dirty&&!f.dirty)c.skip(),this._reconnectEvents(f.name);else{f.cleanGroup();g=f.group;for(var u=c.next("candlestick",[this.opt,f]),B=Array(f.data.length),m=0;m<f.data.length;++m){var e=f.data[m];
if(null!==e){var j=c.addMixin(u,"candlestick",e,!0),C=o(e.x||m+0.5)+b.l+s,k=a.height-b.b,h=p(e.open),i=p(e.close),q=p(e.high),n=p(e.low);if("mid"in e)var D=p(e.mid);if(n>q)var l=q,q=n,n=l;if(1<=d){var l=h>i,v={x1:d/2,x2:d/2,y1:k-q,y2:k-n},w={x:0,y:k-Math.max(h,i),width:d,height:Math.max(l?h-i:i-h,1)},y=g.createGroup();y.setTransform({dx:C,dy:0});var t=y.createGroup();t.createLine(v).setStroke(j.series.stroke);t.createRect(w).setStroke(j.series.stroke).setFill(l?j.series.fill:"white");"mid"in e&&t.createLine({x1:j.series.stroke.width||
1,x2:d-(j.series.stroke.width||1),y1:k-D,y2:k-D}).setStroke(l?"white":j.series.stroke);f.dyn.fill=j.series.fill;f.dyn.stroke=j.series.stroke;r&&(e={element:"candlestick",index:m,run:f,shape:t,x:C,y:k-Math.max(h,i),cx:d/2,cy:k-Math.max(h,i)+Math.max(l?h-i:i-h,1)/2,width:d,height:Math.max(l?h-i:i-h,1),data:e},this._connectEvents(e),B[m]=e)}this.animate&&this._animateCandlesticks(y,k-n,q-n)}}this._eventSeries[f.name]=B;f.dirty=!1}}this.dirty=!1;return this},tooltipFunc:function(a){return'<table cellpadding="1" cellspacing="0" border="0" style="font-size:0.9em;"><tr><td>Open:</td><td align="right"><strong>'+
a.data.open+'</strong></td></tr><tr><td>High:</td><td align="right"><strong>'+a.data.high+'</strong></td></tr><tr><td>Low:</td><td align="right"><strong>'+a.data.low+'</strong></td></tr><tr><td>Close:</td><td align="right"><strong>'+a.data.close+"</strong></td></tr>"+(void 0!==a.data.mid?'<tr><td>Mid:</td><td align="right"><strong>'+a.data.mid+"</strong></td></tr>":"")+"</table>"},_animateCandlesticks:function(a,b,g){G.animateTransform(o.delegate({shape:a,duration:1200,transform:[{name:"translate",
start:[0,b-b/g],end:[0,0]},{name:"scale",start:[1,1/g],end:[1,1]},{name:"original"}]},this.animate)).play()}})});