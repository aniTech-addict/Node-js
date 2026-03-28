const net = require('net');
const readline = require('readline/promises')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout, 
})
const tty = require('node:tty');
const cursor = tty.writeStream;
const host = "20.197.42.131";
// const host = "127.0.0.1";
const client = net.createConnection({host, port: 3000}, async() => {
    while (true) {
        let message = await getMessage();
        if (message == "exit") {
            client.write("destroyed");
            client.destroy();
            break;
        }
        client.write(message);
    }
})

const getMessage = async() => {
    let message;
    moveCursorUp();
    message = await rl.question("Enter a message > ");
    return message;
}

const moveCursorUp =  () => {
    process.stdout.moveCursor(0, -1);
    process.stdout.cursorTo(0, 0);
    process.stdout.clearLine(0);
}

client.on('data', (data) => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    console.log(data.toString('utf-8'));
    process.stdout.write("Enter a message > ");
})
client.on('end', ()=> {
    console.log("End");
})

client.on("error", ()=> {
    console.log("Error");
})

