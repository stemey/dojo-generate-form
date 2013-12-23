Dojo Generate Form: A Dijit to generate a form based on an editor schema
=======================================================================


General
-------


Start reading about gform [here] (http://toobop.net/gform).


The basic dijit to generate a form is called 'Editor'. It has three properties:

1. 'meta' : 			an editor schema  
2. 'plainValue' : 		A plain object which is the data to display in the form or to fill via the form. When setting this value it will be converted to the modelHandle. 
3. 'editorFactory' : 	the editorFactory defines how the properties defined by the schema are displayed by the generated widgets.  

 

Editor Schema
-------------

The editor schema is a json literal that contains all the properties to be displayed and edited in the form. The properties are referred to as attributes.

	{
		code: 'Person'
		attributes: 
		[
			{
				code: 'firstname',
				required: true,
				label: 'first name',
				description: 'the first name of the person',
				type: 'string'
			},
			{
				code: 'salutation',
				required: false,
				label: 'salutation',
				type: 'string',
				values : ['Mr.', 'Mrs.']
			},
			{
				code: 'birthday',
				required: false,
				label: 'date of birth',
				type: 'string'
			}
		]
	}



INSTALLATION
------------

this project is organized like most dojo libraries. If your project is based on the dojo boilerplate layout you can integrate it by adding it as a git submodule named "gform" (not dojo-generate-form) parallel to dojo, dijit, dojox and util. 

To just checkout the tests, tutorials and the documentation clone gform parallel to dojo, dojox, dijit and util.
To view the tutorials you also need to install [SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/) in a parallel directory named sh.
To view the [gridx](http://github.com/oria/gridx) examples install gridx in a parallel directory called gridx. 

The documentation page is doc/index.html.

