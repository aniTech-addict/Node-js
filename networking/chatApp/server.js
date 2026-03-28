const net = require('net');

let id = 1;
const server = net.createServer();
const clients = []; 
const host = "20.197.42.131";
const port = 3000;

server.on("connection", (socket)=> {
    clients.push({id, socket});
    id++;
    console.log("Client connected");

    socket.on('data', (data) => {
        if (data.toString('utf-8') === "destroy") {
            console.log("Client Exited");
        }
        clients.forEach(clientObj => {
            clientObj.socket.write(`Client ${id} : ${data}`);
        });
    })

})


server.listen(port, host, ()=> {
    console.log("open server on ", server.address());
})

