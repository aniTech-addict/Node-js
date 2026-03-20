import {Buffer} from 'buffer'
import fs from 'fs'
import EventEmitter from 'events'

class createReadStream extends EventEmitter {
    constructor (filePath, chunkSize) {
        super()
        this.chunkSize = chunkSize ||  16*1024;
        this.filePath = filePath;
        this.positionIndex = 0;
    }
    read() {
        const readBuffer = Buffer.alloc(this.chunkSize, {encoding:'hex'});
        fs.open(this.filePath, 'r', (err, fd)=> {
            if (err) {
                return this.emit('error', err);
            }
            const readChunk = () => {
            fs.read(fd, readBuffer, 0, readBuffer.length, this.positionIndex, (err ,bytesRead)=> {
                if(bytesRead === 0) {
                    fs.close(fd, (error)=> {console.log(error)});
                    return this.emit('end');
                }
                this.positionIndex+=bytesRead;
                this.emit('data', readBuffer.slice(0, bytesRead));
                readChunk(); // recurse until the end of the file/bytesRead=0/error
            })}
        
            readChunk();
        })
    }


}

export default createReadStream;
