/*
 * MapController
 */
var MapController = function(options){
 
  /*
   * Variables accessible
   * in the class
   */
  var vars = {
      map : null,
      mapDiv  : null,
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
  this.construct = function(options){
      $.extend(vars , options);
  };

  this.initMap = function() {
    vars.map = new google.maps.Map(vars.mapDiv , {
      center: {lat: 40.5609021, lng: -74.3997976}, //defaulted to 08820
      zoom: 13
    });
  }

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