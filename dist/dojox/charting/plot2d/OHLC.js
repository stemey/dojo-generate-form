//>>built
define("dojox/charting/plot2d/OHLC","dojo/_base/lang,dojo/_base/array,dojo/_base/declare,./CartesianBase,./_PlotEvents,./common,dojox/lang/functional,dojox/lang/functional/reversed,dojox/lang/utils,dojox/gfx/fx".split(","),function(n,z,t,u,v,A,D,E,p,F){var G=E.lambda("item.purgeGroup()");return t("dojox.charting.plot2d.OHLC",[u,v],{defaultParams:{gap:2,animate:null},optionalParams:{minBarSize:1,maxBarSize:1,stroke:{},outline:{},shadow:{},fill:{},font:"",fontColor:""},constructor:function(a,b){this.opt=
n.clone(this.defaultParams);p.updateWithObject(this.opt,b);p.updateWithPattern(this.opt,b,this.optionalParams);this.animate=this.opt.animate},collectStats:function(a){for(var b=n.delegate(A.defaultStats),g=0;g<a.length;g++){var d=a[g];if(d.data.length){var c=b.vmin,q=b.vmax;(!("ymin"in d)||!("ymax"in d))&&z.forEach(d.data,function(a,c){if(null!==a){var d=a.x||c+1;b.hmin=Math.min(b.hmin,d);b.hmax=Math.max(b.hmax,d);b.vmin=Math.min(b.vmin,a.open,a.close,a.high,a.low);b.vmax=Math.max(b.vmax,a.open,a.close,
a.high,a.low)}});if("ymin"in d)b.vmin=Math.min(c,d.ymin);if("ymax"in d)b.vmax=Math.max(q,d.ymax)}}return b},getSeriesStats:function(){var a=this.collectStats(this.series);a.hmin-=0.5;a.hmax+=0.5;return a},render:function(a,b){if(this.zoom&&!this.isDataDirty())return this.performZoom(a,b);this.resetEvents();if(this.dirty=this.isDirty()){z.forEach(this.series,G);this._eventSeries={};this.cleanGroup();var g=this.getGroup();D.forEachRev(this.series,function(a){a.cleanGroup(g)})}var d=this.chart.theme,
c,q,n=this._hScaler.scaler.getTransformerFromModel(this._hScaler),r=this._vScaler.scaler.getTransformerFromModel(this._vScaler),p=this.events();c=A.calculateBarSize(this._hScaler.bounds.scale,this.opt);q=c.gap;c=c.size;for(var w=this.series.length-1;0<=w;--w){var e=this.series[w];if(!this.dirty&&!e.dirty)d.skip(),this._reconnectEvents(e.name);else{e.cleanGroup();for(var t=d.next("candlestick",[this.opt,e]),g=e.group,B=Array(e.data.length),k=0;k<e.data.length;++k){var f=e.data[k];if(null!==f){var l=
d.addMixin(t,"candlestick",f,!0),C=n(f.x||k+0.5)+b.l+q,j=a.height-b.b,h=r(f.open),i=r(f.close),o=r(f.high),m=r(f.low);if(m>o)var x=o,o=m,m=x;if(1<=c){var x={x1:c/2,x2:c/2,y1:j-o,y2:j-m},u={x1:0,x2:c/2+(l.series.stroke.width||1)/2,y1:j-h,y2:j-h},v={x1:c/2-(l.series.stroke.width||1)/2,x2:c,y1:j-i,y2:j-i},y=g.createGroup();y.setTransform({dx:C,dy:0});var s=y.createGroup();s.createLine(x).setStroke(l.series.stroke);s.createLine(u).setStroke(l.series.stroke);s.createLine(v).setStroke(l.series.stroke);
e.dyn.stroke=l.series.stroke;p&&(f={element:"candlestick",index:k,run:e,shape:s,x:C,y:j-Math.max(h,i),cx:c/2,cy:j-Math.max(h,i)+Math.max(h>i?h-i:i-h,1)/2,width:c,height:Math.max(h>i?h-i:i-h,1),data:f},this._connectEvents(f),B[k]=f)}this.animate&&this._animateOHLC(y,j-m,o-m)}}this._eventSeries[e.name]=B;e.dirty=!1}}this.dirty=!1;return this},_animateOHLC:function(a,b,g){F.animateTransform(n.delegate({shape:a,duration:1200,transform:[{name:"translate",start:[0,b-b/g],end:[0,0]},{name:"scale",start:[1,
1/g],end:[1,1]},{name:"original"}]},this.animate)).play()}})});