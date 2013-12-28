define({
    // The execution environment(s) for the script being evaluated. (A minimal EcmaScript 5-compliant environment is
    // always defined by default.) The following environments are provided by default:
    //     - amd: An environment with an AMD-compatible loader
    //     - browser: A Web browser environment
    //     - node: A node.js environment
    // Note that js-doc-parse currently expects an AMD environment and might not work correctly if one is omitted.
    // Additional custom environments can be used by passing the module ID of a custom environment module.
    environments: [ 'amd', 'browser' ],

    // The call handler registries to use. The following processors are provided by default:
    //     - amd: Handles AMD define/require calls.
    //     - dojo: Handles core Dojo language functions.
    // Additional custom handler registries can be used by passing the module ID of a custom handler registry.
    callHandlers: [ 'amd', 'dojo' ],

    // The inline documentation processor(s) to use. The following processors are provided by default:
    //    - dojodoc: A parser for the Dojo documentation format
    //    - jsdoc: A parser for the jsdoc documentation format
    // Additional custom processors can be used by passing the module ID of a custom processor module.
    processors: [ 'dojodoc' ],

    // The exporter(s) to use. The following exporters are provided by default:
    //    - dojov1: An exporter for the v1 Dojo API browser.
    //    - dapi: An exporter for https://github.com/lbod/dapi, a javascript port of the Dojo PHP API browser
    //    - tree: export tree data for modules exported by dojov1 or dapi
    // Additional custom exporters can be used by passing the module ID of a custom exporter module.
    // It is also possible to pass additional configuration options to each exporter by passing an object instead
    // of a string, with the following properties:
    //    - id: The module ID of the exporter.
    //    - config: Arbitrary exporter configuration object, passed as an argument to the exporter function.
    exporters: [
        { id: 'dapi', config: { details: 'details.json' } },
        { id: 'tree', config: { tree: 'tree.json' } }
    ],

    // Options for console output during the processing of documentation.
    show: {
        // Show warnings.
        warn:   false,
        // Show informational messages.
        info:   false,
        // Show debugging messages.
        debug:  false,
        // Show current and peak memory usage during processing.
        memory: true
    },

    // The base path for all the packages being processed.
    basePath: '.',

    // The packages to be processed by the parser. The key is the name of the package, and the value is the
    // location of the package relative to basePath.
    packages: {
        dojo: '../dojo',
        dijit: '../dijit',
        dojox: '../dojox',
        gform: '.'
    },

    // An array of regular expressions that match file paths that should be skipped. Note that since these are file
    // paths, not module IDs, if you are using Windows, you need to use backslashes!
    excludePaths: [
        // Non-API code
        /\/(?:tests|nls|demos)\//,

        // used for builds, not part of source
        /dojox/,
        /dijit/,
        /gform\/mobile/,
        /dojo/,
        /node_modules/


    ]
});
