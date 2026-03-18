const fs = require("fs");

/*
Misconcepts : 
strea.write() -> flushes the data and performs the disk write operation, clering out the buffer

Actual Concept:
stream.write() -> queues the incoming buffer in the internal queue, if the incoming queue triggers false for stream.writeable() , the internal buffer is drained and an "drain" event is emitted to signal for safe writes available

Issue/Bugs faced: writes that were not in order and writes that corrupted the previous queued data with new incoming data;

*/

(async() => {
  console.time("insert time");
  const stream = fs.createWriteStream("oneMillionWritesStream.txt");
  
  const chunkBuf = Buffer.alloc(16 * 1024);  // 64KB reusable buffer
  let bufPos = 0;
  let i = 0;
  
  const write = () => {
    while(i < 1000000) {
      // Write number INTO the buffer (not to stream yet)
      const str = ` ${i} `;
      const bytesWritten = chunkBuf.write(str, bufPos);
      bufPos += bytesWritten;
      i++;
      
      // When buffer gets full, flush to stream
      if (bufPos > chunkBuf.length - 8) {  // Leave margin for safety
        const ok = stream.write(chunkBuf, 0, bufPos);  // ✅ No slice!
        console.log(ok)
	bufPos = 0;
        
        if (!ok) {
          stream.once("drain", write);
          return;
        }
      }
    }
    
    // Flush remaining data
    if (bufPos > 0) {
	console.log(bufPos);
	console.log("========================")
      stream.write(chunkBuf, 0, bufPos);
    }
    
    stream.end();
    console.timeEnd("insert time");
  };
  
  write();
})();
