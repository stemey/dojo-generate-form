
0.10.0
------

- Support for maps. Maps are objects with a key of type 'string' and a value of a primitive type or an object. Maps are internally converted to an array with a special unique property. 

- Support for reordering of list by drag-n-drop.

- Model validation allows to validate an object. First implementation is the 'UniqueProperties' validation which makes sure that a property is unique in the elements of a collection. Model validation is triggered by individual property changes. Since dijits validate after they emit value changes, there is a flag in EditorFactory to trigger the model validation asynchronously.

- Editors now have a Context. The Context provides a registry for stores and schemas. The store registry akes it possible to reuse store caches in diferent views. The schema registry provides a cache for schema. Both make it easy to provides mock stores for tests. 

- Editing or creating referenced entities in a sepearate form. The opener property in the Context defines where separate forms are displayed. Currently there are implementations for opening forms in a dialog or tab.

- _CrudMixin provides an easy way to create a controller to load an entity into a form. It also provides easy creation of more buttons and actions (save, delete, discard, ...) for the form. There are concreate subtypes for editing entities in a tab, dialog or a a simple pane

- A mobile editor factory now supports a set of primitive types and an array of primitives.
