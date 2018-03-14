(function (global) {
  global["signal"] = signals.Signal;
  global["evnts"] = {};

  $(document).ready(function () {
    console.log("ready!");
    var map = new MapController({
      mapDiv: $("#map")[0]
    });
    $.extend(true, evnts, {
      "map": map.evnts
    });
    map.initMap();
    var action = new ActionController({
      actionDiv: $("#action")
    });
    $.extend(true, evnts, {
      "action": action.evnts
    });
    action.initAction();
  });
})(this);