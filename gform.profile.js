var profile = (function(){
	var testResourceRe = /^gform\/tests\//,

		copyOnly = function(filename, mid){
			var list = {
				"gform/gform.profile":1,
				"gform/package.json":1,
				"gform/tests":1
			};
			return (mid in list) ||
				(/^gform\/resources\//.test(mid) && !/\.css$/.test(filename)) ||
				/(png|jpg|jpeg|gif|tiff)$/.test(filename) ||
				/built\-i18n\-test\/152\-build/.test(mid);
		};

	return {
		resourceTags:{
			test: function(filename, mid){
				return testResourceRe.test(mid) || mid=="gform/tests" ;
			},

			copyOnly: function(filename, mid){
				return copyOnly(filename, mid);
			},

			amd: function(filename, mid){
				return !testResourceRe.test(mid) && !copyOnly(filename, mid) && /\.js$/.test(filename);
			}
		}
	};
})();
