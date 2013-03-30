<div>
	<h2>Documentation of gform schema</h3>
	<p>This documentation was generated for the standard editorFactory. EditorFactories differ in the attributes and groups they support. An editorFactory for mobiles will support a different set of attributes. The generally supported attributes will probably be the same for mobile and desktop devices but the actual dijits will be different and support different features.
</p> 	

	<h3>Attributes</h3>

<p>
	An attribute may be displayed in different ways. A string can be edited in a textfield or a textarea or a wysiwyg editor. The dijit representing the attribute can be defined using different strategies. Either it is chosen by an id called `editor` or it is chosen programmatically by its properties. A string with maxLength greater than 1000 characters should rather be displayed in a textarea. This logic is implemented in the create function of the attributeFactory that handles attributes of type `string`. To the dijit by its id the attribute in the gform schema must define the property `editor`.
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
			array: true if the attribute represents an array. The elements of the array are described by type and validTypes.  
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
