const EventEmitter = require('./events.js');

class  MyEmitter extends EventEmitter{}; 

const myEmitter = new MyEmitter();

myEmitter.on('Kaboom', ()=> {
	console.log('Something happened');
})

myEmitter.emit('Kaboom');
