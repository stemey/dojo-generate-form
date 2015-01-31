define(['dojo/date/stamp'],
	function (stamp) {
		var x = {
			parse: function (date) {
				var isoDateString = stamp.toISOString(date);
				return isoDateString;
			},
			format: function (date) {
				return stamp.fromISOString(date);
			}
		}
		return x;
	});
