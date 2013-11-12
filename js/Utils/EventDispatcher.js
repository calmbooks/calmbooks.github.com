/**
 *  EventDispatcher
 *
 *  @author calmbooks
 */	
(function(win, doc, exports) {

/**
 *  @class EventDispatcher
 */	
function EventDispatcher() {

	this._listeners = {};
}

var p = EventDispatcher.prototype;

	/**
	 *  @method addEventListener
	 *  @this   EventDispatcher
	 *  @param  {String} type
	 *  @param  {Function} handler 
	 */
	p.addEventListener = function(type, handler) {

		var obj = this._listeners;
		var arr = obj[type];

		if(!arr) {

			arr = obj[type] = [];
		}
		else {
			this.removeEventListener(type, handler);
		}

		arr.push(handler);
	};

	/**
	 *  @method removeEventListener
	 *  @this   EventDispatcher
	 *  @param  {String} type
	 *  @param  {Function} handler 
	 */
	p.removeEventListener = function(type, handler) {

		var obj = this._listeners;
		var arr = obj[type];

		if(!arr) return;

		if(!handler) {

			delete obj[type];
		}
		else {

			for(var i = 0, max = arr.length; i < max; ++i) {

				if(arr[i] == handler) {

					if(max == 1) {
						delete obj[type];
					}
					else {
						arr.splice(i,1);
					}
					break;
				}
			}
		}

	};

	/**
	 *  @method removeAllEventListeners
	 *  @this   EventDispatcher
	 *  @param  {String} type
	 */	
	p.removeAllEventListeners = function(type) {

		if(!type) {
			this._listeners = {};
		}
		else {
			delete this._listeners[type];
		}
	};

	/**
	 *  @method dispatchEvent
	 *  @this   EventDispatcher
	 *  @param  {String} type
	 *  @param  {Object} event_object
	 */		
	p.dispatchEvent = function(type, event_object) {

		var obj = this._listeners;
		var arr = obj[type];

		if(!arr) return;

		var event_object = event_object || {};

		event_object.type = type;

		for(var i = 0, max = arr.length; i < max; ++i) {

			arr[i](event_object);
		}
	};

	/** 
	 *  Shortcut to addEventListener.
	 *
	 *  @method on
	 *  @type   {Function}
	 */
	p.on = p.addEventListener;


	/** 
	 *  Shortcut to removeEventListener.
	 *
	 *  @method on
	 *  @type   {Function}
	 */
	p.off = p.removeEventListener;


exports.EventDispatcher = EventDispatcher;


})(window, document, window);





