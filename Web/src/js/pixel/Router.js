
(function(win, doc, ns) {

    ns.setNS("pixel");

    //-----------------------
    // Import
    //-----------------------
    var EventDispatcher = ns.util.EventDispatcher;
    var SceneManager = ns.pixel.SceneManager;

    //-----------------------
    // Singleton class
    //-----------------------
    var instance;
    var Router = (function() {

        return {
            
            getInstance : function() {

                if(!instance) instance = new _Router();
                return instance;
            }
        }
    })();

    function _Router() {

        EventDispatcher.apply(this);
        this.init();
    }

    _Router.prototype = new EventDispatcher(); // extend

    //-----------------------
    // Public function
    //-----------------------
    _Router.prototype.init = function() {

        console.log("init");

        this.sceneManager = SceneManager.getInstance();
    };


    //-----------------------
    // Export
    //-----------------------    
    ns.pixel.Router = Router; 

})(window, document, window.App);

