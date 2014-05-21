define([
    "dojo/i18n!../nls/validate",
    "dojo/_base/json"

], function (nls, json) {
// module:
//		gform/converter/anyToTextConverter

    return {
        // summary:
        //		converts an object to a json string
        format: function (value) {
            return json.toJson(value, true);
        },
        parse: function (value) {
            try {
                var jsonValue = json.fromJson(value);
                this.source.set("message", "");
                this.source.set("state", "");
                return jsonValue;
            } catch (e) {
                this.source.set("message", nls.invalidJson);
                this.source.set("state", "Error");
                throw e;
            }
        }
    };
});
