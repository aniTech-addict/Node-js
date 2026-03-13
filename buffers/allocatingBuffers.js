const {Buffer} = require('buffer');

/* Safe Buffer Allocation */
const mySafeBuffer = Buffer.alloc(10000) // safe allocation of 1000 bytes that are initialized to 0.

/* Unsafe Buffer Allocation */ 
const myUnsafeBuffer = Buffer.allocUnsafe(10000); // allocation is faster but the buffer bytes are not intialized to 0 and may contain sesitive data

/* May log bytes that have some info stored as it has not been cleared*/
console.log("==== Unsafe Buffer Contents ====")
// myUnsafeBuffer.fill(0); // manual initialization of bytes to 0
for (let i=0; i<myUnsafeBuffer.length; i++) {
	if( myUnsafeBuffer[i] != 0 ) { // if buffer is not empty
		console.log(`Element at pos ${i} has value ${myUnsafeBuffer[i].toString(2)}`) // Logging in base 2 / binary 
	}
}

/* Would log nothing as safe alloc intializes all bits to 0*/
console.log("\n==== Safe Buffer Contents ====")
for (let i=0; i<mySafeBuffer.length; i++) {
	if( mySafeBuffer[i] != 0 ) { // if buffer is not empty
		console.log(`Element at pos ${i} has value ${mySafeBuffer[i].toString(2)}`) // Logging in base 2 / binary 
	}
}
