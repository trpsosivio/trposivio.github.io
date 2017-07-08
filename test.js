var cityData;

$('#query').keyup(function () {
var value = $('#query').val();
var rExp = new RegExp(value, "i");
$.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
console.log(data);
//		sessionStorage.setItem('cityData', data);
// Begin building output
var output = '<ol>';

$.each(data.RESULTS, function (key, val) {
if (val.name.search(rExp) != -1) {
output += '<li>';
output += '<a href="//www.wunderground.com"' + ' onclick="getData(' + val.lat + ',' + val.lon + ')"' + ' title="See results for ' + val.name + '">' + val.name + '</a>';
output += '</li>';
}
}); // end each
output += '</ol>';
console.log(output);
$("#searchResults").html(output); // send results to the page
}); // end getJSON "
}); // end keyup

$('#searchResults').on("click", "a", function(evt) {
evt.preventDefault();
var jsonCity = $(this).text();
console.log(jsonCity);
var index = $(this).index("a");
//		console.log(sessionStorage.getItem('cityData'));
//	getData(cityData.RESULTS[index].zmw);
getData(index.lat, index.lon);
$('#searchResults').hide();
});

function getData(lat, lon) {
$.ajax({
url: "https://api.wunderground.com/api/0374d8d7218313b5/geolookup/conditions/q/" + lat + "," + lon + ".json"
, dataType: "jsonp"
, success: function (data){ 
var location = data['location'].city;
console.log(location);
var temp_f = data['current_observation'].temp_f;
console.log(temp_f);
$('#currentTemp').html(Math.round(temp_f) + " &#8457");
$("title").text(data['current_observation'].display_location.full);
$("#cityDisplay").text(data['current_observation'].display_location.full);
$("#summary").text(data['current_observation'].weather);
$("#add1").html(" Feels like  " + Math.round(data['current_observation'].feelslike_f) + " &#8457");
$("#add2").text("Humidity:  " + data['current_observation'].relative_humidity);
$("#add3").html("Wind from the " + data['current_observation'].wind_dir + " at " + data['current_observation'].wind_mph + " mph");
$("#cover").fadeOut(250);
console.log(data);
}
});