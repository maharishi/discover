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
    };

    this.evnts = {
      onInitMapSearchBox: new signal()
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
      //this.evnts.onInitMapSearchBox.removeAll();
      //this.evnts.onInitMapSearchBox.add(this.initMapSearchBox);
    }

    this.initMap = function () {
      vars.map = new google.maps.Map(vars.mapDiv, {
        center: {
          lat: 40.5609021,
          lng: -74.3997976
        }, //defaulted to 08820
        zoom: 13
      });
    };

    this.initMapSearchBox = function () {
      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
      });

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
            map: map,
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
        map.fitBounds(bounds);
      });
    };

    /*
     * Private method
     * Can only be called inside class
     */
    /*
    var myPrivateMethod = function() {
        console.log('accessed private method');
    };
    */


    /*
     * Pass options when class instantiated
     */
    this.construct(options);

  };

  global['MapController'] = MapController;
})(this);