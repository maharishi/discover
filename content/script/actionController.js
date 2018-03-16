(function (global) {
    /*
     * myClass
     */
    var ActionController = function (options) {

        /*
         * Variables accessible
         * in the class
         */
        var vars = {
            actionDiv: null,
            viewManager: null,
        };

        this.evnts = {
            onClickCanvas: new signal()
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

        this.initAction = function () {
            clog(vars.actionDiv);
            $.getScript("script/actionViewController.js", viewLoaded);
        };

        var viewLoaded = function (data, textStatus, jqxhr) {
            if (jqxhr.status == 200) {
                clog("view manager loaded");
                vars.viewManager = new ActionViewController({
                    controller: this,
                    actionDiv: vars.actionDiv
                });
                clog(vars.viewManager);
                vars.viewManager.initActionViewController();
            }
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
    
    global.ActionController = ActionController;
})(this);