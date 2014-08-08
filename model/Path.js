define([
    "jsonpath/jsonpath"
], function (jsonpath) {

    return function(modelHandle, path) {
        var splits = path.match(/(\.*)(.*)/);
        if (splits.length!==3) {
            throw "cannot evaluate path "+path;
        } else {
            for (var i=0;i<splits[1].length;i++) {
                modelHandle=modelHandle.parent;
            }
            jsonpath.eval(modelHandle.getPlainValue(), splits[2]);
        }
    }
});