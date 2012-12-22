//>>built
define("dojox/validate/_base",["dojo/_base/lang","dojo/regexp","dojo/number","./regexp"],function(g,k,i,j){var c=g.getObject("dojox.validate",!0);c.isText=function(b,a){a="object"==typeof a?a:{};return/^\s*$/.test(b)||"number"==typeof a.length&&a.length!=b.length||"number"==typeof a.minlength&&a.minlength>b.length||"number"==typeof a.maxlength&&a.maxlength<b.length?!1:!0};c._isInRangeCache={};c.isInRange=function(b,a){b=i.parse(b,a);if(isNaN(b))return!1;var a="object"==typeof a?a:{},h="number"==typeof a.max?
a.max:Infinity,d="number"==typeof a.min?a.min:-Infinity,e=c._isInRangeCache,f=b+"max"+h+"min"+d+"dec"+("string"==typeof a.decimal?a.decimal:".");if("undefined"!=typeof e[f])return e[f];e[f]=!(b<d||b>h);return e[f]};c.isNumberFormat=function(b,a){return RegExp("^"+j.numberFormat(a)+"$","i").test(b)};c.isValidLuhn=function(b){var a=0,c,d;g.isString(b)||(b=""+b);b=b.replace(/[- ]/g,"");c=b.length%2;for(var e=0;e<b.length;e++)d=parseInt(b.charAt(e)),e%2==c&&(d*=2),9<d&&(d-=9),a+=d;return!(a%10)};return c});