
(function(win, doc, ns) {

	var FPS = 30;

	var STAGE_W = 800;
	var STAGE_H = 700;
	var ASPECT = STAGE_W / STAGE_H;

	var CANVAS = doc.getElementById("cvsStage");
	var FOV = 60;

	function Test () {

        var prms = { antialias : true, canvas : CANVAS, devicePixelRatio : 1 };

		this.renderer = new THREE.WebGLRenderer(prms);

		this.renderer.setSize(STAGE_W, STAGE_H);
		this.renderer.setClearColor(0xFACA34, 1);

		this.scene = new THREE.Scene();

		this.init();
	}

	Test.prototype.init = function () {

		this.setLights();
		this.setCamera();

        this.setObjects();

		this.scene.add(new THREE.GridHelper(3, 0.5));
		this.scene.add(new THREE.AxisHelper(50.0));

		this.startUpdate();
    }

	Test.prototype.setLights = function () {

		this.directionalLight = new THREE.DirectionalLight(0xFFFFFF);
		this.ambientLight = new THREE.AmbientLight(0x777777);

        this.directionalLight.position.set(0, 10, 0);

		this.scene.add(this.directionalLight);
		this.scene.add(this.ambientLight);
    }

	Test.prototype.setCamera = function () {

		this.camera = new ns.pixel.MainCamera();
        this.controls = new THREE.OrbitControls(this.camera);

		this.scene.add(this.camera);
    }

	Test.prototype.setObjects = function () {

        var geo = new THREE.SphereGeometry(2, 32, 32);
        var mat = new THREE.MeshPhongMaterial({ color : 0xFF0000, ambient: 0x555555 });

        this.mesh = new THREE.Mesh(geo, mat);
        this.scene.add(this.mesh);
    }

	Test.prototype.startUpdate = function () {

        var that = this;

        setInterval(function() {

            that.renderer.render(that.scene, that.camera);
            // that.camera.update();
            that.controls.update();

        }, 1000 / FPS);
	}

	win.addEventListener( "load", function() {

		new Test();

	} ,false );

})(window, document, window.App);
