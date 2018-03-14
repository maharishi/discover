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
        console.log("action view controller");
        getActionControls();
    };

    var getActionControls = function () {
        $.getScript("content/views/actionDefaultView.js", function (data, textStatus, jqxhr) {
            if (jqxhr.status == 200) {
                console.log("views loaded");
                console.log(data);
                var joinedctrls = "";
                $.each(content.controls, function (n, elem) {
                    $.each(elem, function (n, html) {
                        if (n == "html") {
                            joinedctrls = joinedctrls + html.join(" ");
                        }
                    });
                });
                console.log(joinedctrls);
                $(vars.actionDiv).append(joinedctrls);
            }
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