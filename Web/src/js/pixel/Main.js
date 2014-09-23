
(function(win, doc, ns) {

    ns.setNS("pixel");

    //-----------------------
    // Import
    //-----------------------
    var Router = ns.pixel.Router;

    //-----------------------
    // Class
    //-----------------------
	function Main() {

		this.init();
	}

	Main.prototype.init = function () {

        this.router = Router.getInstance();
    }

    //-----------------------
    // Global init
    //-----------------------
	win.addEventListener("load", function() {

		new Main();

	} ,false);

})(window, document, window.App);
