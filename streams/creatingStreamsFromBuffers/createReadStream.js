import { Buffer } from 'buffer';
import fs from 'fs';
import EventEmitter from 'events';

class readStream extends EventEmitter {
    constructor(filePath, chunkSize) {
        super();
        this.filePath = filePath;
        this.chunkSize = chunkSize || 16 * 1024;
        this.fd = null;
        this.position = 0;
        this.closed = false;
    }

    read() {
        // Open file if not already open
        if (!this.fd) {
            fs.open(this.filePath, 'r', (err, fd) => {
                if (err) {
                    this.emit('error', err);
                    return;
                }
                this.fd = fd;
                this._readChunk(); // Start reading after file is open
            });
        } else {
            this._readChunk(); // Continue reading if file is already open
        }
    }

    _readChunk() {
        const buffer = Buffer.alloc(this.chunkSize);
        
        fs.read(this.fd, buffer, 0, this.chunkSize, this.position, (err, bytesRead, buffer) => {
            if (err) {
                this.emit('error', err);
                this._closeFile();
                return;
            }

            if (bytesRead > 0) {
                this.position += bytesRead;
                const data = buffer.slice(0, bytesRead); // Only emit the actual bytes read
                this.emit('data', data); // Emit data event with the chunk
            } else {
                // End of file reached
                this.emit('end');
                this._closeFile();
            }
        });
    }

    _closeFile() {
        if (this.fd && !this.closed) {
            this.closed = true;
            fs.close(this.fd, (err) => {
                if (err) {
                    this.emit('error', err);
                }
            });
        }
    }
}

export default readStream;