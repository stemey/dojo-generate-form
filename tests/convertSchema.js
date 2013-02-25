define(["doh/runner","dojox/json/ref","gform/convertSchema","dojo/text!./meta/contacts_schema.json"], function(doh,ref,convertSchema,contactsSchemaJson){

	var biggerSchema = {
		"readonly":true,
		"type":"object",
		"properties":{
		  "name": {"type":"string",
			 length:5,
		     "optional":false},
		  "tuple":{items:[{"type":"integer"},
		  {"type":"string"},
		  {"type":"boolean"}]},
		  "born" : {"type":"number", //allow for a numeric year, or a full date
		    "format":"date", //format when a string value is used
		    "minimum":1900, //min/max for when a number value is used
		    "maximum":2010
		  },
		  "gender" : {"type":"string",
		  	"options":[{"label":"Male",value:"male"},{"label":"Female",value:"female"}]},
			  "address" : {"type":"object",
			  	"properties":
			      {"street":{"type":"string"},
			       "city":{"type":"string"},
			       "state":{"type":"string"}}
			  }
		}
	};

	var schemas={};
var index={};
	
	var loader=function(s) {
			console.log("load "+s);
	}
  var contactsSchema = dojo.fromJson(contactsSchemaJson);
	//console.log(dojo.toJson(contactsSchema,true));


    doh.register("gform-convertSchema", [
      function testPlainProperty(){
				var meta = convertSchema(contactsSchema);
				console.log(dojo.toJson(meta,true));({})
      }
    ]);

});




