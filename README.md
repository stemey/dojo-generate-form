Gform: A dojo library to create administrative front-ends
=========================================================


General
-------

Start reading about gform [here] (http://toobop.net/gform).

Features
--------

- declare your form with [gform schema](http://toobop.net/gform/app/schema).
- supports nearly any model: lists, maps, nested objects, multi-typed objects. Supports recursive schemas to create tree models.
- ideal to map to class-based languages like Java, because it supports the concept of type properties.
- relations between resources (entities) is supported. A related resource can be opened in a dialog, a tab container or another custom opener.
- Customization of UI by assiging attributes to groups. These can be TabContainer, Accordions or multi-column container.
- Customization of attribute editor. For example a string property can be displayed as a textField, textarea, WYSIWYG editor or [Ace sourcecode editor](http://ace.c9.io).

Links
---------------

- [gform-admin](https://github.com/stemey/gform-admin): A generic administration for [mongoosejs](http://mongoosejs.com/) and an alternative [swagger ui](http://swagger.wordnik.com/).
- [Kitchensink](http://toobop.net/gform/app/example/kitchensink/index.html) shows nearly all the features in a single form.
- [Formbuilder](http://toobop.net/gform/app/example/formbuilder/index.html) is a form to interactively design a form. Can be used as a basis for creating tools
or simply to checkout gform features online.


INSTALLATION
------------


git clone https://github.com/stemey/dojo-generate-form.git gform

install dependencies parallel to this project:

bower install


TESTS
------


Tests run in the browser. You need an http server running serving dojo-generate-form at <server>/gform.

All tests:

<server>/util/doh/runner.html?testModule=gform/tests/module

Example for single test:

<server>/gform/tests/test_primitive_ref.html

Example for test that does require a browser:

<server>/gform/tests/test_libs.html?test=gform.tests.model/TreeGroup



