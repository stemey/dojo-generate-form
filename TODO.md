#Kitchensink

- clientside validation: usedojo.form to validate all dijits. display error messages
- add serverside validation errors to the model
- 

#DecoratorWidget

- add required icon
- label should be above field
- receive state events from dijit, propagate as validation events (including property name)


#Groups 

- listen to validationEvents from DecoratorWidget (should this be a dijit mixin?)
- update valid icon. Traverse model for message changes
- proagate 

# AttributeWidgets

- add constraints: required, pattern, maxLength, minLength, standard error message