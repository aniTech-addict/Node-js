class EventEmitter {
	
	/**
	 * Main object to handle all active listieners 
	 */
	listiener = {};


	addEventListiener (eventName, fn) {}
	/*
	 * Push the object to the listiener object
	 */
	on() {}

	/*
	 * remove the object from thr listiener object
	 */
	removeEventListiener (eventName, fn) {}
	off () {}
	
	/* 
	 * Push and remove the object after one emit
	 * */
	once() {}
	
	/*
	 * Emit the event
	 * */
	emit(eventName, ...args) {}

	listienerCount() {};

	rawListieners{};

};
