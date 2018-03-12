$( document ).ready(function() {
  console.log( "ready!" );
  var map = new MapController({mapDiv : $("#map")[0]});
  map.initMap();
  var action = new ActionController({actionDiv : $("#action")});
  action.initAction();
});
