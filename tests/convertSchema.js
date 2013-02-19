define(["doh/runner","gform/convertSchema"], function(doh,convertSchema){

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
		  },({})
		  "gender" : {"type":"string",({})
		  	"options":[{"label":"Male",value:"male"},{"label":"Female",value:"female"}]},
			  "address" : {"type":"object",
			  	"properties":
			      {"street":{"type":"string"},
			       "city":{"type":"string"},
			       "state":{"type":"string"}}
			  }
		}
	};


    doh.register("gform-convertSchema", [
      function testPlainProperty(){
				var meta = convertSchema(biggerSchema);
				console.log(dojo.toJson(meta,true));({})
      }
    ]);

});




