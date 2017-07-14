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
				$("#homecontent").load("/acme/index.html");
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

				$("#name").text(name);
				$("#description").text(description);
				$("#manufacturer").text(manufacturer);
				$("#reviews").text(reviews);
				$("#price").text(price);
				$("#name").text(name);
				$("#homecontent").hide();

			}
		});
	});

});
