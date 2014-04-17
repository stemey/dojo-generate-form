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
            if (url){
			var lastSlashIndex = url.lastIndexOf("/");
			var id = url.substring(lastSlashIndex + 1, url.length);
			var collectionUrl = url.substring(0, lastSlashIndex);
            collectionUrl=collectionUrl.replace(/\/+$/,"")
			return {id: id, url: collectionUrl};
            } else {
                return {id:null,url:null}
            }
		},
		compose: function (collectionUrl, id) {
			//  description:
			//		compose url to resource from id and collectionUrl
			//  collectionUrl: String
			//		the collection's url
			//  id: any
			//		the resoure's id
			//  returns:
			//		the url to the resource.
            collectionUrl=collectionUrl.replace(/\/+$/,"")
            return collectionUrl + "/" +id;

		}
	};

});
