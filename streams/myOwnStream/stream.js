const {Buffer} = require('buffer');
const fs = require('fs/promises');

(async () => {
    const readFileHandler = await fs.open("oneMillion.txt", 'r');
    const writeFileHanler = await fs.open("oneMillionWrite.txt", 'w');
    let bytesRead = -1;
    while (bytesRead != 0) {
        const readBuffer = await readFileHandler.read();
        bytesRead = readBuffer.bytesRead;
        await writeFileHanler.write(readBuffer.buffer);
    }
})()
