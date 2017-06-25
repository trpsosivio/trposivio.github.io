// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
	status.text('Getting Location...');
	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(function (position) {
		var lat = position.coords.latitude;
		var long = position.coords.longitude;

		// Call the getData function, send the lat and long
		getData(lat, long);

	  });
	} else {
	  status.text("Your browser doesn't support Geolocation or it is not enabled!");
	}

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
	$.ajax({
		url : "http://api.wunderground.com/api/3f7014209d97ddbd/geolookup/conditions/q/"+ lat +","+ long +".json",
		dataType : "jsonp",
		success : function(parsed_json) {
			var location = parsed_json['current_observation']['display_location']['full'];
			var temp_f = parsed_json['current_observation']['temp_f'];
			var wind = parsed_json['current_observation']['wind_mph'];
			var weather = parsed_json['current_observation']['weather'];
			var feel = parsed_json['current_observation']['feelslike_f'];
			console.log(getData);
			var dirwind = parsed_json['current_observation']['wind_dir'];
			$("#cityDisplay").text(location);
			$("#currentTemp").html(temp_f + "&#176 F");
			$("#summary").text(weather)
			$("#add2").text("Wind Speed: " + wind + " mph");
			$("#add1").html("Feels like: " + feel + "&#176 F")
			$("#add3").text("Wind direction: " + dirwind);
			$("#cover").fadeOut(250);
		}



		   });

  }

  // A function for changing a string to TitleCase
  function toTitleCase(str){
	return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
