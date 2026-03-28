const {Buffer} = require('buffer')
const fs = require('fs')

class DuplexStream {


}

class WriteStream {

    constructor (writeHighMark, filepath) {
    this.writeHighMark = writeHighMark || 16*1024;
    this.filepath = filepath
    this.writeBuffer = Buffer.alloc(writeHighMark);
    this.position = 0;
    this.bytesWritten = 0;
    this.fd = null;
    this.buffOffset=0;
    }

    write(content) {
        this._open();
        
        this.bytesWritten += this.writeBuffer.write(content.slice(this.position, this.position + this.writeHighMark- this.bytesWritten), this.buffOffset, this.writeBuffer.length - this.buffOffset, 'utf-8')
        if (this.bytesWritten < this.writeHighMark) {
            this.position += this.bytesWritten;
            return true;
        } else {
            _flush();
            return false;
        }
    }

    _flush() {
        fs.write(
            this.fd, this.writeBuffer, {this.writeBuffer.length, this.writeHighMark - this.position, this.position}, (err, bytesWritten, buffer) => {
            if (err) {
                this.emit('error', err);
            }  
            this.emit('drain', buffer);
            this.position += bytesWritten;
            this.buffOffset = 0;
        )
    }

    _open () {
        if (this.fd) {
            return;
        }
        fs.open(this.filepath, 'w', (err, fd)=> {
            if (err) {
                this.emit('error', err);
                this._close();
            }
            this.fd = fd;
        })
    }

    _close () {
        if(this.fd) {
            fs.close(this.fd);
            this.emit('close');
        }
        this.emit('end');
    }
    
}

class ReadStream {
    constructor (readHighMark, filepath) {
        this.readHighMark = readHighMark || 16*1024;
        this.filepath = filepath
        this.readBuffer = Buffer.alloc(readHighMark);
        this.position = 0;
        this.fd = null;
        this._read();
    }

    _read () {
        _open()
        fs.read(fd, readBuffer, this.position, readBuffer.length, this.position, (err, bytesRead, bffer) => {
            if (err) {
                this.emit('error', err);
                this._close();
            }
            if (bytesRead !== 0) {
                this.position += bytesRead;
                this.emit('data', buffer.subarray(posiiton, bytesRead));
                this._read(); // recusive call 
            } else {
                this.emit('end');
                this._close();
            }

        })
    }

    _open () {
        if(!this.fd) {
            fs.open(this.filepath, 'r', (err, fd)=> {
                if (err) {
                    this.emit('err', err);
                    this._close();
                }
                this.fd = fd;
            })
        }
    }

    _close () {
        if(this.fd) {
            fs.close(this.fd);
            this.emit('close');
        }
        this.emit('end');
    }

}
