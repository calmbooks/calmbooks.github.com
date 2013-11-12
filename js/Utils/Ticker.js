/**
 *  Ticker
 *
 *  @author calmbooks
 */	
(function(win, doc, exports) {

/**
 *  @class Ticker
 */	
function Ticker( FPS ) {

	this._interval;

	this._listeners = [];
	this._times     = [];
	this._timeoutID = null;

	this._startTime = this._lastTime = this.getTime();

	this._times.push( this._startTime );

	this.setFPS( FPS || 60 );

	this._setTick();
}

var now = win.performance && ( performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow );

var p = Ticker.prototype;

	p.addListener = function( handler ) {

		var arr = this._listeners;

		if(arr.length) {
			this.removeListener( handler ); // Prevent duplicates
		}

		handler._startTime = this.getTime();

		arr.push(handler);
	};

	p.removeListener = function( handler ) {

		var arr = this._listeners;

		for(var i = 0, max = arr.length; i < max; ++i) {

			if(arr[i] == handler) arr.splice(i,1);
		}
	};

	p.removeAllListeners = function() {

		this._listeners = [];
	};

	p.setFPS = function( FPS ) {

		this._interval = 1000 / FPS;
	};

	p.getFPS = function() {

		return 1000 / this._interval;
	};

	p.getTime = function() {

		return ( now && now.call( performance ) ) || ( new Date().getTime() );
	};

	p.getMeasuredFPS = function() {

		var times = this._times;
		var ticks = times.length - 1;

		return 1000 / ( ( times[ticks] - times[0] ) / ticks );
	};

	p._setTick = function() {

		if(this._timeoutID != null) return; // Prevent duplicates

		var _this = this;

		this._timeoutID = setTimeout(function() {

			_this._timeoutID = null;
			_this._setTick();
			_this._tick();

		}, this._interval);
	};

	p._tick = function() {

		var nowTime = this.getTime();

		var event_object = {

			delta       : nowTime - this._lastTime,
			measuredFPS : this.getMeasuredFPS()
		};

		var listeners = this._listeners;

		for(var i = 0; i < ( listeners ? listeners.length : 0 ); ++i) {

			var listener = listeners[i];

			event_object.runTime = nowTime - listener._startTime;

			listener(event_object);
		}

		this._lastTime = nowTime;

		this._times.push(nowTime);

		if(this._times.length > 100) this._times.shift();
	};


exports.Ticker = Ticker;


})(window, document, window);

