define([
    './controller/actions/Close',
    './controller/actions/Discard',
    './controller/actions/Delete',
    './controller/actions/Save',
    './controller/actions/ActionFactory'


], function (Close, Discard, Delete, Save, ActionFactory) {

    var actionFactory = new ActionFactory();
    actionFactory.add({type: Save});
    actionFactory.add({type: Delete});
    actionFactory.add({type: Discard});
    actionFactory.add({type: Close});


    return function () {
        return actionFactory;
    };

});
