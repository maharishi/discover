(function(global){
    var debug = true;
    global["clog"] = function(msg){
        if(debug){
            console.log(msg);
            //console.trace(msg);
        }
    }
    global["cerr"] = function(e, msg){
        if(debug){
            console.error(msg);
            console.trace(e);
        }
    }
    global["ctrace"] = function(msg){
        if(debug){
            console.trace(msg);
        }
    }
})(this);