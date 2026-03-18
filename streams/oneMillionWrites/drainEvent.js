import { open, createWriteStream } from 'fs'
import {Buffer} from "buffer";
(()=> {
    console.time("time")
    const stream = createWriteStream("example.txt")
   
    const buff = Buffer.alloc(65535);
    let ok = stream.write(buff)
    
    console.log("Write Stream High Water Mark: " + stream.writableHighWaterMark)
    console.log("Write Stream Length: " + stream.writableLength)
    console.log("Space Available: " + ok)
    
    const buff1 = Buffer.alloc(1);

    ok = stream.write(buff1)
    console.log("Write Stream Length: " + stream.writableLength)
    console.log("Space Available: " + ok)
    
    stream.end()
    console.timeEnd("time")
})()