/*jshint unused:false*/
var dojoConfig = {
    async: true,
    baseUrl: '../../',
    //tlmSiblingOfDojo: false,
    isDebug: true,
    packages: [
        {name:'dojo',location:'dojo'},
        'dijit',
        'dojox',
        {name: 'doh', location: 'util/doh'},
        {name: 'gform', location: 'gform'},
        {name: 'ace', location: 'ace/lib/ace'}
    ]
    //	deps: [ 'app' ]//,
//	callback: function (test) {
//		test.init();
//	}
};
