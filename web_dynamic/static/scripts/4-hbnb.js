document.ready(function () {
	const amenities = {};
	$('[data-id]').css('marginLeft', '30px');
	$("li input[type=checkbox]").change(function () {
		if (this.checked) {
			amenities[this.dataset.name] = this.dataset.id;
		} else {
			delete amenities[this.dataset.name];
		}
		$(".amenities h4").text(Object.keys(amenities).sort().join(", "));
	});

	$.getJSON('http://0.0.0.0:5001/api/v1/status/', (data) => {
		if (data.status === 'OK') {
			$("div#api_status").addClass("available");
		} else {
			$("div#api_status").removeClass("available");
		}
	});

	$.ajax({
		type: 'POST',
		url: 'http://localhost:5001/api/v1/places_search',
		data: '{}',
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
		  $('SECTION.places').append(data.map(place => {
			return `<article>
					  <div class="title_box">
						<h2>${place.name}</h2>
						<div class="price_by_night">${place.price_by_night}</div>
					  </div>
					  <div class="information">
						<div class="max_guest">${place.max_guest} Guests</div>
						<div class="number_rooms">${place.number_rooms} Bedrooms</div>
						<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
					  </div>
					  <div class="description">
						${place.description}
					  </div>
					</article>`
		  }));
		}
	});

	$('#search').click(function() {
		const filter = {amenities: Object.keys(nameAmenity)};
		search(filter);
	})
	search();
});
