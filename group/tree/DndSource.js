define([
    'dijit/tree/dndSource',
    "dojo/_base/declare"
], function (dndSource, declare) {

    return declare("gform-app.group.tree.DndSource", [dndSource], {
        betweenThreshold: 5,
        checkAcceptance: function (source, nodes) {
            // TODO only allow drags inside of a tree
            return true;
        },
        checkItemAcceptance: function (target, source, position) {

            var target =source.current.item;
            var drags =  source.getSelectedTreeNodes().map(function(node) {
                return node.item;
            });
            var accepted =  false;
            if (target.accept){
                accepted=target.accept(drags[0],position);
            }  else{
                accepted = position!=="over" && target.schema == drags[0].schema;
            }
            return accepted;
        }
    });

});
