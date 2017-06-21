
function initMap(){
	var map = new google.maps.Map(document.getElementById("myMap"),{
		zoom: 5,
		center: {lat: -9.1191427, lng: -77.0349046},
		mapTypeControl: false,
		zoomControl: false,
		streetViewControl: false
	});

	//llamamos a las ids del origen y fin del recorrido
	var inicio = document.getElementById("source");
	var fin = document.getElementById("destination");

	//para completar el llenado de los inputs
	var autocomplete = new google.maps.places.Autocomplete(inicio);
	autocomplete.bindTo("bounds",map)

	var autocomplete = new google.maps.places.Autocomplete(fin);
	autocomplete.bindTo("bounds",map)
}