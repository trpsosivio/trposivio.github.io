$('#query').keyup(function() {
	var value = $('#query').val();
	var rExp = new RegExp(value, "i");
	$.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
		console.log(data); // test for JSON received
		// Begin building output
		var output = '<ol>';
		$.each(data.RESULTS, function(key, val) {
			if (val.name.search(rExp) != -1) {
				output += '<li>';
				output += '<a href="//www.wunderground.com"' + ' onclick="getData(' + val.lat + ',' + val.lon + ')"' + ' title="See results for ' + val.name + '">' + val.name + '</a>';
				output += '</li>';
			}
		}); // end each
		output += '</ol>';
		$("#searchResults").html(output); // send results to the page
	}); // end getJSON
}); // end onkeyup



// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
	evt.preventDefault();
	// With the text value get the needed value from the weather.json file
	var jsonCity = $(this).text(); // Franklin, etc...
	console.log(this);
	console.log(jsonCity);
	index = $(this).index("a");
	console.log(index);
	getData(index.lat, index.lon);


	$("#searchsection").hide();
	$("#searchResults").hide();
	document.getElementById('searchResults').style.display = 'none';

});
function getData(lat, long){
	$.ajax({
		url : "https://api.wunderground.com/api/3f7014209d97ddbd/geolookup/conditions/forecast/q/"+ lat +","+ long +".json",
		dataType : "jsonp",
		success : function(parsed_json) {
			var location = parsed_json['current_observation'].display_location.full
			var temp_f = parsed_json['current_observation'].temp_f;
			var wind = parsed_json['current_observation']['wind_mph'];
			var weather = parsed_json['current_observation']['weather'];
			var feel = parsed_json['current_observation']['feelslike_f'];
			console.log(parsed_json);
			var dirwind = parsed_json['current_observation']['wind_dir'];
			var precip = parsed_json['current_observation']['precip_1hr_in']
			var hightemp = parsed_json['forecast']['simpleforecast']['forecastday']['0']['high']['fahrenheit'];
			var lowtemp = parsed_json['forecast']['simpleforecast']['forecastday']['0']['low']['fahrenheit'];
			$("#cityDisplay").text(location);
			$("#currentTemp").html(temp_f + "&#176 F");
			$("#summary").text(weather)
			$("#wind").text("Wind Speed: " + wind + " mph");
			$("#add1").html("Feels like: " + feel + "&#176 F")
			$("#direction").text("Wind direction: " + dirwind);
			$('#precip').text("Precipitation: " + precip);
			$('#highlow').html("L: " + lowtemp + "&#176/ H: " +hightemp + "&#176" );




		}
	})
}
