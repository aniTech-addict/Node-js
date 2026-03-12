class EventEmitter {
	
	/**
	 * Main object to handle all active listieners 
	 */
	listieners = {};

	/*
	 * Takes an event and the callback function to be executed 
	 * if already exists then return the array else register the event and return empty array. 
	 */
	addEventListiener (eventName, fn) {
		this.listieners[eventName] = this.listieners[eventName] || [];
		this.listieners[eventName].push(fn);
		return this;
	}
	/*
	 * alias to the addEventListiener
	 * Push the object to the listiener object
	 */
	on(event, fn) {
		return this.addEventListiener(event, fn);
	}

	/*
	* remove the listiener(eventName) from the events arrays 
	*/
	removeEventListiener (eventName, fn) {
		let lis = this.listiener[eventName];
		if(!lis) return this;
		for( let i=listtiener.length()-1 ; i>=0 ; i++) {
			if (lis[i] === fn) {
				lis.splice(i,1);
			}
		}
		return this;
		
	}
	// alias for removeEventEmitter
	off (eventName, fn) {
		return this.removeEventListiener(eventName, fn);
	}
	
	/* 
	 * Push and remove the object after one emit
	 * */
	once() {
		
	}
	
	/*
	 * Emit the event
	 * */
	emit(eventName, ...args) {
		let funs = this.listieners[eventName];
		if (!funs) return false;
		funs.forEach((fn)=>{
			fn(...args);
		});

	}

	listienerCount() {};

	rawListieners() {};

};

module.exports = EventEmitter;
