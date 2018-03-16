(function (global) {
  /*
   * MapController
   */
  var MapController = function (options) {

    /*
     * Variables accessible
     * in the class
     */
    var vars = {
      map: null,
      mapDiv: null,
      infowindow: new google.maps.InfoWindow(),
    };

    this.evnts = {
      onInitMapSearchBox: new signal(),
      onPlaceSearch: new signal(),
    };
    /*
     * Can access this.method
     * inside other methods using
     * root.method()
     */
    var root = this;

    /*
     * Constructor
     */
    this.construct = function (options) {
      $.extend(vars, options);
      attachEvents();
    };

    var attachEvents = function(){
      root.evnts.onInitMapSearchBox.add(root.initMapSearchBox);
      root.evnts.onPlaceSearch.add(root.placeSearch);
    };

    this.initMap = function () {
      var loc = getBrowserLocation();
      vars.map = new google.maps.Map(vars.mapDiv, {
        center: {
          lat: loc == null ? 40.5609021 : loc.lat,
          lng: loc == null ? -74.3997976 : loc.lng
        }, //defaulted to 08820
        zoom: 13
      });
    };

    var getBrowserLocation = function(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
          return {"lat": position.coords.latitude ,"lng": position.coords.longitude}; 
        });
      }
      return null;
    };

    this.initMapSearchBox = function () {
      // Create the search box and link it to the UI element.
      var input = document.getElementById('canvaslocation');
      var searchBox = new google.maps.places.SearchBox(input);

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: vars.map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        vars.map.fitBounds(bounds);
      });
    };

    this.placeSearch = function (searchplaces) {
      var service = new google.maps.places.PlacesService(vars.map);
      service.nearbySearch({
        location: {lat: vars.map.center.lat(), lng: vars.map.center.lng()},
        radius: 500,
        type: [searchplaces]
      }, function(results, status){
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      });
    };

    var createMarker = function (place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: vars.map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        vars.infowindow.setContent(place.name);
        vars.infowindow.open(vars.map, this);
      });
    };

    /*
     * Pass options when class instantiated
     */
    this.construct(options);

  };

  global.MapController = MapController;
})(this);