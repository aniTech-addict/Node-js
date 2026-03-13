const {Buffer} = require('buffer');

// Creating Buffer of fixed lenght (here) 4 bytes/ 32 bits
const memoryContainer = Buffer.alloc(4);

//  Logging values of the allocated Buffer
console.log(memoryContainer[0]); //decimal value when logged
console.log(memoryContainer); // 8 bits = 8/4 = 2 | <00> in hex

console.log();
// (1) Modifying values of Buffer
memoryContainer[0] = 0xff; // 255 in decimal

// Logging modified values
console.log(memoryContainer[0]); 
console.log(memoryContainer); // <ff 00 00 00>

console.log("\n========Storing negative numbers========");
// (a) Storing neg numbers:
/* for storing the neg number ,
	such as -34,
	the decimal value is 222, hexadecimal = DE, bits = 1101 1110

	the logic is to flip all the bits and add one to get the neg number

	flipped_bits = 0010 0001
	flipped_bits in decimal = 33

	add one to flipped_bits = neg number stored = 33+1 = 34 (negative number)
*/
memoryContainer[1] = -34;
console.log(memoryContainer[1]);
console.log(memoryContainer);

console.log();
/* (preffered meathod) Using write methods (here) buffer.writeInt8(int value, int offfset) to write 8 bits
* use read methods to log in decimal values. buffer.readInt8 (int offset) 
*/
memoryContainer.writeInt8(-34, 1) // value, offset
console.log(memoryContainer[1]);
console.log(memoryContainer.readInt8(1)) //offset , logs in decimal value
console.log(memoryContainer);

console.log();
console.log('=========buffer as string=========');
console.log(memoryContainer.toString('hex')); 
