const fs = require("fs");

(async() => {
  console.time("insert time");
  const stream = fs.createWriteStream("oneMillionWritesStream.txt");
  
  const chunkBuf = Buffer.alloc(64 * 1024);  // 64KB reusable buffer
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
      if (bufPos > chunkBuf.length - 100) {  // Leave margin for safety
        const ok = stream.write(chunkBuf, 0, bufPos);  // ✅ No slice!
        bufPos = 0;
        
        if (!ok) {
          stream.once("drain", write);
          return;
        }
      }
    }
    
    // Flush remaining data
    if (bufPos > 0) {
      stream.write(chunkBuf, 0, bufPos);
    }
    
    stream.end();
    console.timeEnd("insert time");
  };
  
  write();
})();
