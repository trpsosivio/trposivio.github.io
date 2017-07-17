$(document).ready(function () {

	function getData() {
		$.ajax({
			url: "/acme/js/acme.json",
			datatype: "json",
			success: function (data) {
				console.log(data);
				var home = data.Navigation.Home.nav;
				var anvil = data.Navigation.Anvils.nav;
				var explosives = data.Navigation.Explosives.nav;
				var decoys = data.Navigation.Decoys.nav;
				var traps = data.Navigation.Traps.nav;
				$("#home").text(home);
				$("#anvils").text(anvil);
				$("#explosives").text(explosives);
				$("#decoys").text(decoys);
				$("#traps").text(traps);
				console.log(explosives);

				$("#filler").hide();
			}

		});
	}

	var test = getData();
	console.log(test);
	$("#page-nav").on("click", "a", function (evt) {
		evt.preventDefault();
		var nav = $(this).text();
		console.log(nav);
		if(nav == 'Home'){

			$("#wrapper").load("/acme/index.html");

		}
		else{
		$.ajax({
			url: "/acme/js/acme.json",
			dataType: "json",
			success: function (data) {
				console.log(data);
				var name = data.Navigation[nav].name;
				var description = data.Navigation[nav].description;
				var manufacturer = data.Navigation[nav].manufacturer;
				var reviews = data.Navigation[nav].reviews;
				var price = data.Navigation[nav].price;
				var path = data.Navigation[nav].path;

				$("#name").text(name);
				$("#description").text(description);
				$("#manufacturer").html("<strong>Made by:</strong>" + ' ' + manufacturer);
				$("#reviews").text(reviews +"/5 Stars");
				$("#price").html("<strong>Price:</strong>" + " $" + price);
				$("#name").text(name);
				$("#homecontent").hide();
				$("#path").html('<img src="' + path +'" alt="item picture" id="' + nav +'">');

				}

		});
		}
	});

});
