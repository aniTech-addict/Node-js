import createReadStream from './streamv2.js'

const stream = new createReadStream('./oneMillion.txt')

stream.on('error', (error)=>{
    console.log(error);
})

stream.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
})

stream.read()
