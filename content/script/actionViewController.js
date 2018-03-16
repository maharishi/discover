/*
 * ActionViewController
 */
var ActionViewController = function (options) {

    /*
     * Variables accessible
     * in the class
     */
    var vars = {
        controller: null,
        actionDiv: null,
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
    };

    /*
     * Public method
     * Can be called outside class
     */

    this.initActionViewController = function () {
        clog("action view controller");
        //getActionControls();
        var buttons = ["Homes", "Schools", "Restaurants", "Transits", "Groceries"];
        getActionTemplate(buttons);
    };

    var getActionTemplate = function(buttonData){
        $.ajax({
            url: "views/actionView.html",
            dataType: "text"
        }).done(function(data, textStatus, jqXHR){
            var template = ejs.compile(data);
            clog(template);
            $(vars.actionDiv).append((template({"buttons" : buttonData})));
        });
    };

    /*
     * Private method
     * Can only be called inside class
     */
    /*
    var myPrivateMethod = function() {
        clog('accessed private method');
    };
    */


    /*
     * Pass options when class instantiated
     */
    this.construct(options);

};