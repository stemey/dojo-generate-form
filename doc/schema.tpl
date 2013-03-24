<div>
	<h2>Documentation of gform schema</h3>
	<p>This documentation was generated for the  editor factory. EditorFactories differ in the attributes and groups they support. An editorFactory for mobiles will support a different selection of attributes. The general supported attributes will probably the same for mobile and desktop devices but the actual dijits will be different and support different features.
</p> 	

	<h3>Attribute editors</h3>

<p>
	An attribute may be displayed in different ways. A string can be edited in a textfield or a textarea or a wysiwyg editor. The attribute editor can be defined using different strategy. Either it is chosen by its id or it is chosen programmatically by its properties. A string with maxLength greater than 1000 characters should rather be displayed in a textarea. To choose an editor by it id the attribute in the gform schema must define the id in the editor propery. The second Strategy is can be implemented in  the AttributeFactory by implmenting the handles function accordingly.
</p>

<p>
	Most properties for the various attributes are documented here. Some of these properties are available for all attributes and some are specific to the dijit used. General properties for attribtues are :
<ul>
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
