define([
], function () {

    return  {
        compose: function (collectionUrl, id) {
            //  description:
            //		compose url to resource from id and collectionUrl
                //  collectionUr id
            //  returns:
            //		the url to the resource.
            if (typeof collectionUrl == "string" && collectionUrl.substring(collectionUrl.length-1)=="/") {
                return collectionUrl +  id;
            }else {
                return collectionUrl + "/" + id;
            }
        }
    };

});
