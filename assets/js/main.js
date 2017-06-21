
function initMap(){
	var map = new google.maps.Map(document.getElementById("myMap"),{
		zoom: 10,
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

	document.getElementById("show").addEventListener("click",marcarInicio);

	var geocoder = new google.maps.Geocoder();
	function marcarInicio(){
		if(geocoder){
			geocoder.geocode({'address':inicio.value},geocodeResult);
			geocoder.geocode({'address':fin.value},geocodeResult);
			route();
		}
	}

	function geocodeResult(results, status) {
		// Verificamos el estatus
		if (status == 'OK') {
			// Si hay resultados encontrados, centramos y repintamos el mapa
			// esto para eliminar cualquier pin antes puesto
			var mapOptions = {
				center: results[0].geometry.location,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			//map = new google.maps.Map($("#map_canvas").get(0), mapOptions);
			// fitBounds acercará el mapa con el zoom adecuado de acuerdo a lo buscado
			map.fitBounds(results[0].geometry.viewport);
			// Dibujamos un marcador con la ubicación del primer resultado obtenido
			var icono = "http://maps.google.com/mapfiles/kml/shapes/";
			var markerOptions = { position: results[0].geometry.location, draggable: true, icon: icono + "cycling.png"}
			var marker = new google.maps.Marker(markerOptions);
			marker.setMap(map);
		} else {
			// En caso de no haber resultados o que haya ocurrido un error
			// lanzamos un mensaje con el error
			alert("Geocoding no tuvo éxito debido a: " + status);
		}
	}

	function route(){
		var directionsService = new google.maps.DirectionsService;
		var directionsDisplay = new google.maps.DirectionsRenderer;

		directionsDisplay.setMap(map);

		var inicio = document.getElementById("source").value;
		var fin = document.getElementById("destination").value;

		var request = {
			origin: inicio,
			destination: fin,
			travelMode: "DRIVING"
		};

		directionsService.route(request, function(result, status){
			if (status == "OK"){
				directionsDisplay.setDirections(result);
			}
		})
	}
}