define(['dojo/_base/lang', 'dojo/_base/url', 'dojo/io-query', 'dojo/_base/declare'],
    function (lang, Url, ioQuery, declare) {
// module:
//		gform/schema/Transformer

        return declare('Transformer', [], {
            replacements: {},
            transforms: {},
            add: function (transformer) {
                this.transforms[transformer.id] = transformer;
            },
            replace: function (url, newUrl) {
                this.replacements[url] = newUrl;
            },
            isTransform: function(url) {
                return this.parseUrl(url).transforms.length>0;
            },
            parseUrl: function (url) {
                url = new Url(url);
                if (url.query) {
                    var query = ioQuery.queryToObject(url.query);
                    var ts;
                    if (Array.isArray(query.transforms)) {
                        ts = query.transforms;
                    } else if (!query.transforms) {
                        ts = [];
                    } else {
                        ts = [query.transforms];
                    }
                    return {
                        url: url,
                        transforms: ts
                    };
                } else {
                    return {url: url, transforms: []};
                }
            },
            transform: function (transformId, object) {
                var transformer = this.transforms[transformId];
                if (transformer) {
                    return transformer.execute(object);
                } else {
                    return object;
                }
            },
            transformObject: function (url, object) {
                var transforms = this.parseUrl(url).transforms;
                if (transforms) {
                    transforms.forEach(function (t) {
                        object = this.transform(t, object);
                    }, this);
                }
                return object;
            },
            getUrlForRef: function (baseUrl, relUrl) {
                var url = new Url(baseUrl, relUrl);
                var path = url.path;
                var uri;
                if (path in this.replacements) {
                    var newPath = this.replacements[path];
                    uri = url.uri.replace(path, newPath);
                } else {
                    uri=url.uri;
                }
                return uri;
            }
        });

    });