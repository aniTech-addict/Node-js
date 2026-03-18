/*
cionst fs = require('fs/promises');
// V.System info = 2 cores , 8gb ram

// =================== Promises-API ==========================
// average time = 30s , avg mem usage = 40mb, cpu usage = 33%


(async()=> {

	const fileHandler = await fs.open("oneMillionWrites.txt", 'a'); 
	console.time("insert");
	for (let i=0; i<1000000; i++) {
		await fileHandler.write(` ${i} `);
	}
	console.timeEnd("insert");
})();
*/

//const fs = require('fs');
// =================== Callback-API ==========================
// writeSync() instead of fs.write()
// average time = 0.3ms , avg mem usage = 17mb, cpu usage = 0.1% 
/*
(async() => {
	console.time("insert");
	fs.open("oneMillionWritesCallback.txt", "w", (err, fd) => {
		for (let i=0; i<1000000; i++) {
			fs.write(fd, ` ${i} `, ()=> {});
// Writes happen out of order due to the async nature of the command.			
//one million callbacks sitting in event loop cause high mem usage , avg mem usage = 1gb, cpu usage = 77% avg, runtime = 0.4ms -> can not be trusted as it continues to executes the callback from the eventloop.
// real metrics using `time node oneMillionWrites.js` 11.76s user 12.70s system 209% cpu 11.658 total	
		}
	})
	console.timeEnd("insert");
})();
*/


//=============== Stream-API ====================
//standard way, handling any backpressure
//1.25s user 0.24s system 114% cpu 0.907 total
const fs = require("fs"); (async() => {
  console.time("insert time");
  let event=0;	
  const stream = fs.createWriteStream("oneMillionsWritesStream.txt");
  let i = 0;
	const write = () => {
    while (i<1000000) {

      const ok = stream.write(` ${i} `, 'utf-8');	
  	  i++;
      if (!ok) {
        stream.once('drain', ()=> {
          write();
        }
        );
        return;
      }
    }
    stream.end()
  }
  write();
})();

/*
const fs = require("fs");
(async()=> {
  const stream = fs.createWriteStream("oneMillionsWritesStream.txt")
  for(let i=0; i<1000000; i++){
    stream.write(` ${i} `)
  }
})();
*/
