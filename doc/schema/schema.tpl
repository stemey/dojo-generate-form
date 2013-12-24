<div>
	<h2>Gform schema documentation</h3>

	<h3>Attributes</h3>

<p>
	An attribute may be displayed in different ways. A string can be edited in a textfield or a textarea or a wysiwyg editor. The widget representing the attribute can be defined using different strategies. Either it is chosen by an id called `editor` or it is chosen programmatically by its properties. A string with maxLength greater than 1000 characters should rather be displayed in a textarea. This logic is implemented in the `handles` and `create` function of the attributeFactory. To choose the dijit by its id the attribute in the gform schema must define the property `editor`.
</p>

<p>
	Most properties for the various attributes are documented here. Some of these properties are available for all attributes and some are specific to the dijit used. General properties for attributes are:
<ul>
	<li>
			code: the name of the json property described by the attribute and bound to the dijit
	</li>
	<li>
			type: The type of the attribute. predefined values are: `string`, `boolean`, `number`, `date`, `time`, `datetime`, `array` and `map`.
	</li>
	<li>
			editor: This id identifies a specific editor to display the attribute.
	</li>
	<li>
			label: a human readable text to display as label next to the dijit.
	</li>
	<li>
			description: a human readable text to display as a tooltip next to the label.
	</li>

</ul> 
</p>

	  <% for (var idx in attributes) { var attribute=attributes[idx]; %>
			<div data-dojo-type="dijit/TitlePane" title="<%= attribute.id %>" data-dojo-props="open:false">
				<p><% if (attribute.description) {%><%=attribute.description%><% } %></p>
				<% if (attribute.instanceExample) {%>
				<h5>instance example</h5>
				<pre class="examplecode">
					<code class="javascript"><%= attribute.instanceExample %></code>
				</pre>	
				<% } %>			
				<% if (attribute.example) {%>
				<h5>schema example</h5>
				<pre class="examplecode">
					<code class="javascript"><%= attribute.exampleForDoc || attribute.example %></code>
				</pre>	
				<% } %>			
				<ul>
					<% for (var idx in attribute.props) { var prop=attribute.props[idx]; %>
						<li>	<%=prop.code%> <% if (prop.required) {%><super>*</super><%} %> <span class="type"><%=prop.type%></span>
							<p><%=prop.description%></p>

						</li>
					<% } %>
				</ul>
    	</div>
    <% } %>

	<h3>Groups</h3>
	<p>
		Groups have two functions. Firstly they define types by grouping attributes and optionally giving it a name (the code). Secondly the group also has a visual representation.
		Also groups can be nested. The nested groups do not affect the type but add add more structure to the visiual representation (e.g. tabs and accordions).
		A group is always chosen by the property `editor`. An editorFactory also defines a default groupfactory wich will be chosen if the `editor` is absent.
	</p>
        <% for (var idx in groups) { var attribute=groups[idx]; %>
				<div data-dojo-type="dijit/TitlePane" title="<%= attribute.id %>" data-dojo-props="open:false">
                				<p><% if (attribute.description) {%><%=attribute.description%><% } %></p>
                				<% if (attribute.instanceExample) {%>
                				<h5>instance example</h5>
                				<pre class="examplecode">
                					<code class="javascript"><%= attribute.instanceExample %></code>
                				</pre>
                				<% } %>
                				<% if (attribute.example) {%>
                				<h5>schema example</h5>
                				<pre class="examplecode">
                					<code class="javascript"><%= attribute.exampleForDoc || attribute.example %></code>
                				</pre>
                				<% } %>
                				<ul>
                					<% for (var idx in attribute.props) { var prop=attribute.props[idx]; %>
                						<li>	<%=prop.code%> <% if (prop.required) {%><super>*</super><%} %> <span class="type"><%=prop.type%></span>
                							<p><%=prop.description%></p>

                						</li>
                					<% } %>
                				</ul>
                    	</div>
      <% } %>
	</ul>

</div>
