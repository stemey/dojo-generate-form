define([
], function () {

    return  {
        decompose: function (url) {
            //  description:
            //		decompose url into id and collectionUrl
            //  url: String
            //		the url
            //  returns:
            //		an object containing the id and the url to the collection.
            var lastSlashIndex = url.lastIndexOf("/");
            var id = url.substring(lastSlashIndex + 1, url.length);
            var collectionUrl = url.substring(0, lastSlashIndex);
            return {id: id, url: collectionUrl};
        },
        compose: function (collectionUrl, id) {
            //  description:
            //		compose url to resource from id and collectionUrl
                //  collectionUr id
            //  returns:
            //		the url to the resource.
            if (collectionUrl.substring(collectionUrl.length-1)=="/") {
                return collectionUrl +  id;
            }else {
                return collectionUrl + "/" + id;
            }
        }
    };

});
