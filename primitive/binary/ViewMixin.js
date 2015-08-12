define([
    "dojo/_base/declare"
], function (declare) {

    return declare([  ], {
        units:["byte","KB","MB","GB"],
        baseUrl:null,
        calculateSize:function(file){
            var size = file.size || file.length;
            var unit=0;
            while(size>1000) {
                size=Math.round(size/1000);
                unit++;
            }
            return size+" "+this.units[unit];
        }
    });

});
