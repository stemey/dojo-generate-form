var profile = (function () {
	var testResourceRe = /^gform\/(tests|mobile|node_modules)\//,

		copyOnly = function (filename, mid) {
			var list = {
				"gform/package.json": 1,
                "gform/Gruntfile":1,
                "gform/jsdoc-config":1
			};
			return (mid in list) || (/^gform\/resources\//.test(mid) && !/\.css$/.test(filename)) || /(png|jpg|jpeg|gif|tiff)$/.test(filename);
		};

	return {
		resourceTags: {
			test: function (filename, mid) {
				return testResourceRe.test(mid);
			},

			copyOnly: function (filename, mid) {
				return copyOnly(filename, mid);
			},

			amd: function (filename, mid) {
				return !testResourceRe.test(mid) && !copyOnly(filename, mid) && /\.js$/.test(filename);
			}


		}
	};
})();



