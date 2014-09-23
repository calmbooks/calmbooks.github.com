
(function(win, doc, ns) {

    ns.setNS("pixel");

    //-----------------------
    // Import
    //-----------------------
    var EventDispatcher = ns.util.EventDispatcher;
    var Ticker = ns.util.Ticker;
    var MainCamera = ns.pixel.MainCamera;

    //-----------------------
    // Construct
    //-----------------------
	var FPS = 60;
    var DEBUG = true;

	var STAGE_W = win.innerWidth;
	var STAGE_H = win.innerHeight;
	var ASPECT = STAGE_W / STAGE_H;

	var CANVAS = doc.getElementById("cvsStage");

    //-----------------------
    // Singleton class
    //-----------------------
    var instance;
    var SceneManager = (function() {

        return {
            
            getInstance : function() {

                if(!instance) instance = new _SceneManager();
                return instance;
            }
        }
    })();

    function _SceneManager() {

        EventDispatcher.apply(this);

        var prms = { antialias : true, canvas : CANVAS, devicePixelRatio : 1 };

		this.renderer = new THREE.WebGLRenderer(prms);

		this.renderer.setSize(STAGE_W, STAGE_H);
		this.renderer.setClearColor(0xF9F9F9, 1);

		this.scene = new THREE.Scene();
        
        this.init();
    }

    _SceneManager.prototype = new EventDispatcher(); // extend

    //-----------------------
    // Public function
    //-----------------------
	_SceneManager.prototype.init = function () {

		this.setLights();
		this.setCamera();

        this.setObjects();

        if( DEBUG ) this.setDebug();

		this.startUpdate();
    }

	_SceneManager.prototype.setLights = function () {

		this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
		this.ambientLight = new THREE.AmbientLight(0x777777);

        this.directionalLight.position.set(0, 10, 10);

		this.scene.add(this.directionalLight);
		this.scene.add(this.ambientLight);
    }

	_SceneManager.prototype.setCamera = function () {

		this.camera = new MainCamera(ASPECT);
		this.scene.add(this.camera);

        var self = this;

        setTimeout(function() {

            self.camera.goTargetHouse();

        }, 1000);
    }

	_SceneManager.prototype.setDebug = function () {

		this.scene.add(new THREE.GridHelper(3, 0.5));
		this.scene.add(new THREE.AxisHelper(50.0));

        this.controls = new THREE.OrbitControls(this.camera);
    }

	_SceneManager.prototype.setObjects = function () {

        var geo = new THREE.CubeGeometry(2, 2, 0.4);
        var mat = new THREE.MeshPhongMaterial({ color : 0xFF0000, ambient: 0xFF0000 });

        for( var x = 0, xLen = 10; x < xLen; ++x ) {

            for( var z = 0, zLen = 10; z < zLen; ++z ) {

                var mesh = new THREE.Mesh(geo, mat);
                mesh.position.set(x*5-25,0,z*5-25);
                this.scene.add(mesh);
            }
        }
    }

	_SceneManager.prototype.startUpdate = function () {

        var self = this;

        this.ticker = Ticker.getInstance();

        this.ticker.addListener(function( event ) {

            self.renderer.render(self.scene, self.camera);
            self.camera.update(event.delta);
            if( DEBUG ) self.controls.update();

        }, 1000 / FPS);
	}


    //-----------------------
    // Export
    //-----------------------    
    ns.pixel.SceneManager = SceneManager; 

})(window, document, window.App);
