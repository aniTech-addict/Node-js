const {Buffer} = require('buffer');

/* Safe Buffer Allocation */
const mySafeBuffer = Buffer.alloc(10000) // safe allocation of 1000 bytes that are initialized to 0.

/* Node has  8 bytes of preallocated buffer that can be used using allocUnsage, this reduces the need for using heap memory to alloc new Buffers.
NOTE: This preallocated pool can be utilized only using allocUnsafe and not alloc as alloc uses heap to allocated Buffers 
*/

// poolSize = predefined memory allocation that the Buffer module uses to optimize performance and speed for small buffer allocation.
 
/* Unsafe Buffer Allocation*/ 
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

//========= Extras =========
/* 
When using Buffer.allocUnsafe() to allocate new Buffer instances, allocations less than Buffer.poolSize >>> 1 (4KiB when default poolSize is used) are sliced from a single pre-allocated Buffer. This allows applications to avoid the garbage collection overhead of creating many individually allocated Buffer instances. This approach improves both performance and memory usage by eliminating the need to track and clean up as many individual ArrayBuffer objects.

const myAllocUnsafeSlow = Buffer.allocUnsafeSLow(20000);
*/
