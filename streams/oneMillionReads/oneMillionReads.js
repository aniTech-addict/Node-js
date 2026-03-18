import { read } from 'fs';
import fs from 'fs/promises'

(async()=> {
    const fileHandlerReader = await fs.open('oneMillionReads.txt', 'r')
    const fileHandlerWriter = await fs.open('destination.txt', 'w')
    const readStream = fileHandlerReader.createReadStream();
    const writeStream = fileHandlerWriter.createWriteStream();

    readStream.on('data', (chunk) => {
        const ok = writeStream.write(chunk);
        if(!ok) {
            readStream.pause();
        }

        console.log(chunk.toString('utf-8'))
    });

    writeStream.on("drain", () => {
        readStream.resume();
    })
})();