Dojo Generate Form: A Dijit to generate a form based on an editor schema
=======================================================================


General
-------

The basic dijit to generate a form is called 'Editor'. It has three properties:

1. 'meta' : an editor schema  
2. 'modelHandle' : A dojo stateful which is the data to display in the form or to fill via the form.  
3. 'editorFactory' : the editorFactory defines how the properties defined by the schema are displayed by the generated widgets.  

 

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
				type: 'string',
				dateformat : 'yyyy-MM-dd'
			},
			{
				code: 'friends',
				required: false,
				label: 'your best friends',
				type: 'Friend',
				array: true,
				validTypes : [
						{
							code: 'Friend',
							attributes: [
								{
									code: 'nickname',
									required: true,
									label: 'nickname',
									type: 'string'
								},
								{
									code: 'birthday',
									required: false,
									label: 'date of birth',
									type: 'string',
									dateformat : 'yyyy-MM-dd'
								}
							]
						}
					]
			}
		]
	}

An editor schema has the property 'code' to give it a name. The property 'attributes' is an array of all the properties to be displayed. The attributes have the following properties

1. code: the property name 
2. required: defines whether the attribute needs to be set
3. label, description: display name and description to decorate the form. 
4. type: the type of the attribute. Predefined values are: 'string', 'number', 'boolean
5. array: is the property an array
6. validTypes: if the type of the property is an object, then validTypes describes the possible editor schemas for the property. There maybe more than one because the Editor supports polymorphism. The object created will have a special proeprty that describes its type. 
7. values: an array of possible values to choose from. The attribute will usually be represented by a select box.

A documentation of all the properties will be available soon. For now you can checkout the tests.

###Creating a schema

The schema is similar to IETF proposal for json schema. It differs in that in the json schema it is hard to add more information to properties (attributes). It is easy enough to transform a json schema into an editor schema. A json schema is available from different sources. An editor schema can be directly created with the atem transformation library. The atem rest project provides a way to easily expose your java beans via a restful service and the accompanying editor schema. An example application is the atem client.

EditorFactory: customizing the form 
-----------------------------------

The editorFactory contains a list of groupFactories and attributeEditorFactories. The Editor is made up of nested groups and attributeEditors. Currently there is only a group that displays all attributeEditors in a vertical list. Each attributeEditor is wrapped in a Widget that displays its name and possibly its description. The attributeEditor itself is created by the attributeEditorFactory. The latter inspects the attributes and creates an appropriate widget. 


INSTALLATION
------------

this project is organized like most dojo libraries. If your project is based on the dojo boilerplate layout you can integrate it by adding it as a git submodule parallel to dojo, dijit, dojox and  util. 


