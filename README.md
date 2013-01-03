Dojo Generate Form: A Dijit to generate a form based on a editor schema
=======================================================================


General
-------

The basic dijit to generate a form is called 'Editor'. It has three properties:

1. 'meta' : an editor schema  
2. 'modelHandle' : A dojo stateful which is the data to display in the form or to fill via the form.  
3. 'editorFactory' : the editorFactory defines how the properties defined by the schema are displayed by the generated widgets.  

 

Editor Schema
-------------

The editor schema is a json literal that contains all the properties to be displayed and edited in the form. 

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
			}
		]
	}

An editor schema has the property 'code' to give it a name. The property 'attributes' is an array of all the properties to be displayed. The attributes have the following properties

1. code: the property name 
2. required: defines whether the attribute needs to be set
3. label, description: display name and description to decorate the form. 
4. type: the type of the attribute. Predefined values are: 'string', 'number', 'boolean
5. array: is the property an array
6. validTypes: if the type of the property is an object, then validTypes describes the possible editor schemas for the property. There maybe more than one because the Editor supports polymorphism.
7. values: an array of possible values to choose from. The attribute will usually be represented by a select box.

A documentation of all the proepertis will be available soon. For now you can checkout the tests.

EditorFactory: customizing the form 
-----------------------------------

The editorFactory contains a list of groupFactories and attributeEditorFactories. The Editor is made up of nested groups and attributeEditors. Currently there is only a group that displays all attributeEditors in a vertical list. Each attributeEditor is wrapped in a Widget that displays its name and possibly its description. The attributeEditor itself is created by the attributeEditorFactory. The latter inspects the attributes and creates an appropriate widget. 


