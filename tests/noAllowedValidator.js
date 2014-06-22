define([
], function () {
    return function(value) {
        return function(model) {
            var errors =[];
            if (model.getPlainValue()===value) {
                errors.push({path:"",message:"this value is not allowed"})
            }
            return errors;
        }
    }

});
