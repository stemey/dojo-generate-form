0.22.0 (22.03.2014)
-----------------

- primitive attributes now support ´defaultValue`. Model provides a initDefault method which initializes the model with the defaults.

- SingleObject supports additional dynamic properties. Add an attribute of type any and declare additionalProperties referencing that attribute in the schema.
This feature was enabled by adding a transformIn and transformOut method to Model. It transforms the value before and after calling update and getPlainValue respectively.

- SingleObject now initializes its attributes lazily. This make tree-like structures possible.

- editor.onChange does not accept a callback anymore. You need to do ´aspect.after(editor, "onChange");´

- badges for group state are now created by DecoratorFactory.createBadge

0.21.0 (22.03.2014)
-----------------


0.20.0 (24.12.2013)
-----------------

- schema was refactored.

- The definition of arrays and maps were changed. Use type = "array" or "map". Define the elements in separate properties.

- The id of a group was changed from groupType to editor.

- model was refactored. The model contains all the behavior and has a rich inheritance hierachy. getPlainValue and updateModelHandle were dropped.

- validation is now implemented in the model and can be extended.


0.10.0 (9.9.2013)
-----------------

- Upgraded to dojo 1.9.1

- Support for maps. Maps are objects with a key of type 'string' and a value of a primitive type or an object. Maps are internally converted to an array with a special unique property. 

- Support for reordering of lists by drag-n-drop.

- Model validation allows to validate an object. First implementation is the 'UniqueProperties' validation which makes sure that a property is unique in the elements of a collection. Model validation is triggered by individual property changes. Since dijits validate after they emit value changes, there is a flag in EditorFactory to trigger the model validation asynchronously.

- Editors now have a Context. The Context provides a registry for stores and schemas. The store registry makes it possible to reuse store caches in different views. The schema registry provides a cache for schemas. Both make it easy to provides (synchronuos) mocks for tests. 

- Editing or creating referenced entities in a sepearate form. The opener property in the Context defines where separate forms are displayed. Currently there are implementations for opening forms in a dialog or tab.

- _CrudMixin provides an easy way to create a controller to load an entity into a form. It also provides easy creation of buttons and actions (save, delete, discard, ...) for the form. There are concreate subtypes for editing entities in a tab, dialog or a a simple pane

- A mobile editorFactory now supports a set of primitive types and an array of primitives.

