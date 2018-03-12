/*
 * ActionViewController
 */
var ActionViewController = function(options){

    /*
     * Variables accessible
     * in the class
     */
    var vars = {
        controller : null,
        actionDiv : null,
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

    /*
     * Public method
     * Can be called outside class
     */
    
    this.initActionViewController = function(){
        console.log("action view controller");
        getCanvasSetControl();
    };
    
    var getCanvasSetControl = function() {
        var ctrl =  [
            "<div id='canvasctrl' class='input-group mb-3'>",
            "<label for='canvaslocation' />",
            "<input type='text' class='form-control' id='canvaslocation' placeholder='Enter Location' aria-label='Enter Location to search' />",
            "<button id='canvasgo' type='button' class='btn btn-primary'>Go</button>",
            "</div>",
        ].join(" ");
        $(vars.actionDiv).append(ctrl);
        console.log(ctrl);
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
