//>>built
define("dojox/mvc/at",["dojo/_base/kernel","dojo/_base/lang","./sync","./_atBindingExtension"],function(a,c,b){a.experimental("dojox.mvc");a=function(a,c){return{atsignature:"dojox.mvc.at",target:a,targetProp:c,bindDirection:b.both,direction:function(a){this.bindDirection=a;return this},transform:function(a){this.converter=a;return this}}};a.from=b.from;a.to=b.to;a.both=b.both;return c.setObject("dojox.mvc.at",a)});