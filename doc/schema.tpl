<div>
	<h2>Gform schema documentation</h3>
	<p>This documentation was generated for the standard editorFactory. EditorFactories create a form according to a schema. They differ in the attributes and groups they support. An editorFactory for mobiles will support a different set of attributes. The attributes that are generally supported are most likely the same for mobile and desktop devices but the widgets are different and support different features.
</p> 	

	<h3>Attributes</h3>

<p>
	An attribute may be displayed in different ways. A string can be edited in a textfield or a textarea or a wysiwyg editor. The widget representing the attribute can be defined using different strategies. Either it is chosen by an id called `editor` or it is chosen programmatically by its properties. A string with maxLength greater than 1000 characters should rather be displayed in a textarea. This logic is implemented in the `create` function of the attributeFactory that handles attributes of type `string`. To choose the dijit by its id the attribute in the gform schema must define the property `editor`.
</p>

<p>
	Most properties for the various attributes are documented here. Some of these properties are available for all attributes and some are specific to the dijit used. General properties for attribtues are :
<ul>
	<li>
			code: the name of the json property described by the attribute and bound to the dijit
	</li>
	<li>
			type: The primitive type of the attribute. predefined values are: `string`, `boolean`, `number`, `date`, `time`, `datetime`.
	</li>
	<li>
			validTypes: if the attribute represents a complex property or array then type property can be left out and instead the validTypes property contains an array of types/groups;
	</li>
	<li>
			label: a human readable text to display as label next to the dijit.
	</li>
	<li>
			array: true if the attribute represents an array. The elements of the array are described by type and validTypes. In the future this property will probably be replaced by a property whose values can be `array` or `map`.   
	</li>
</ul> 
</p>

	  <% for (var idx in attributes) { var attribute=attributes[idx]; %>
				<div data-dojo-type="dijit/TitlePane" title="<%= attribute.id %>" data-dojo-props="open:false">
				<p><% if (attribute.description) {%><%=attribute.description%><% } %></p>
				<% if (attribute.instanceExample) {%>
				<pre class="examplecode">
					<code class="javascript"><%= attribute.instanceExample %></code>
				</pre>	
				<% } %>			
				<% if (attribute.example) {%>
				<pre class="examplecode">
					<code class="javascript"><%= attribute.exampleForDoc || attribute.example %></code>
				</pre>	
				<% } %>			
				<ul>
					<% for (var key in attribute.properties) { var prop=attribute.properties[key]; %>
						<li>	<%=key%>	
							<% if (key=="validTypes") { %>
								<ul><li>An array of groups. Each group needs to provide a code property and optionally a label property.</li></ul>
							<% } else if (key=="mapped_values") { %>
								<ul><li>An object whose values are options. Options are arrays containing strings or objects with label and value properties. The key of the object is matched against the value of the mapped_atribute.</li></ul>
							<% } else if (key=="values") { %>
								<ul><li>Values are the options to choose from in a drop down list or similar elements. These arrays contain strings or objects with label and value properties. </li></ul>
							<% } else { %>
							<ul>
								<% for ( var propKey in prop) { %>
									<li><%=propKey%>:<%=prop[propKey]%>	
									</li>
								<% } %>
							</ul>
							<% } %>
						</li>
					<% } %>
				</div>
    <% } %>
	</ul>

	<h3>Groups</h3>
	<p>
		Groups give structure to a form. Attributes can be grouped in tabs or titlepanes. Groups can be nested. A group is always chosen by the property `groupType`. An editorFactory also defines a default groupfactory wich will be chosen if the `groupType` is absent.
	</p>
    <% for (var idx in groups) { var group=groups[idx]; %>
				<div data-dojo-type="dijit/TitlePane" title="<%= group.id %>" data-dojo-props="open:false">
				<p><% if (group.description) {%><%=group.description%><% } %></p>
				<% if (group.instanceExample) {%>
				<pre class="examplecode">
					<code class="javascript"><%= group.instanceExample %></code>
				</pre>	
				<% } %>			
				<% if (group.example) {%>
				<pre class="examplecode">
					<code class="javascript"><%= group.example %></code>
				</pre>	
				<% } %>			
				<ul>
					<% for (var key in group.properties) { var prop=group.properties[key]; %>
						<li>	<%=key%>	
							<%  if (key=="attributes") { %>
								<ul><li>An array of attribute definitions.</li></ul>
							<% } else if (key=="groups") { %>
								<ul><li>An array of group definitions.</li></ul>
							<% } else { %>
								<% for ( var propKey in prop) { %>
								<ul>
									<li><%=propKey%>:<%=prop[propKey]%>	
									</li>
								</ul>
								<% } %>
							<% } %>
						</li>
					<% } %>
				</div>
    <% } %>
	</ul>

</div>
