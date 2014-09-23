
(function(win, doc, ns) {

    ns.setNS("pixel");

    //-----------------------
    // Construct
    //-----------------------
    var NEAR = 0.1;
    var FAR = 1000;
	var FOV = 60;

    //-----------------------
    // Class
    //-----------------------
    function MainCamera( aspect ) {

        THREE.PerspectiveCamera.apply(this, [ FOV, aspect, NEAR, FAR ]);
        this.init();
    }

    MainCamera.prototype = new THREE.PerspectiveCamera();  // Extend

    //-----------------------
    // Public function
    //-----------------------
	MainCamera.prototype.init = function() {

        console.log("init");

        this.DUMMY_PATH = new THREE.SplineCurve3([
            new THREE.Vector3( 25, 0, 25 ),
            new THREE.Vector3( 25, 0, 20 ),
            new THREE.Vector3( 20, 0, 15 ),
            new THREE.Vector3( 15, 0, 15 ),
            new THREE.Vector3( 10, 0, 10 ),
            new THREE.Vector3( 5, 0, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 0, 0, -5 ),
            new THREE.Vector3( -5, 0, -5 ),
            new THREE.Vector3( -5, 0, -10 ),
            new THREE.Vector3( -10, 0, -10 ),
            new THREE.Vector3( -15, 0, -15 ),
            new THREE.Vector3( -15, 0, -20 ),
            new THREE.Vector3( -20, 0, -25 ),
            new THREE.Vector3( -25, 0, -25 ),
        ]);

        this.time = 0;
        this.flag = false;

        console.log(this);

        this.position.set(0, 10, 10);
		this.lookAt(new THREE.Vector3(0, 0, 0));
    }

	MainCamera.prototype.AroundMode = function( bool ) {
    }

	MainCamera.prototype.goTargetHouse = function() {

        this.flag = true;

        this.time = 0;
        this.duration = 5000;
    }

	MainCamera.prototype.setStartPosition = function() {
    }

	MainCamera.prototype.update = function( delta ) {

        if( !this.flag ) return;

        this.time += delta;
        var t = this.time / this.duration;

        if( t > 1 ) return;

        var pos = this.DUMMY_PATH.getPointAt(t);
        this.position.set(pos.x, pos.y, pos.z);
    }

    //-----------------------
    // Export
    //-----------------------    
    ns.pixel.MainCamera = MainCamera; 


})(window, document, window.App);
