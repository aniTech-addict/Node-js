import fs from 'fs/promises'

(async()=> {
    const fileHandlerReader = await fs.open('oneMillionReads.txt', 'r')
    const stream = fileHandlerReader.createReadStream();

    stream.on('data', (chunk) => {
        console.log(chunk.toString('utf-8'))
    });
})();