import fs from 'fs/promises'

(async()=> {
    const fileHandlerReader = await fs.open('oneMillionReads.txt', 'r')
    const fileHandlerWriter = await fs.open('destination.txt', 'w')
    const readStream = fileHandlerReader.createReadStream();
    const writeStream = fileHandlerWriter.createWriteStream();
    let split='';
    readStream.on('data', (chunk) => {
        const chunkArr = chunk.toString().split("  ")
        if (Number(chunkArr[0])+1 != Number(chunkArr[1]) ) {
            if (split) chunkArr[0] = split + chunkArr[0];
        }

        //check if last ele has split issue:
        if (Number(chunkArr[chunkArr.length-1])-1 != Number(chunkArr[chunkArr.length-2]) ) {
            split = chunkArr.pop();
        }
        
        console.log(chunkArr);
        const ok = writeStream.write(chunk);
        if (!ok) {
            readStream.pause();
        }

    });

    writeStream.on('drain', ()=> {
        readStream.resume();
    })

})();
