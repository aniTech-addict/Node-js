import net from 'net'

const server = net.createServer((socket) => {
    console.log('Client connected');
    
    // Handle incoming data
    socket.on('data', (data) => {
        console.log('Received:', data.toString().trim());
        
        // Check if it's an HTTP request
        if (data.toString().startsWith('GET / HTTP')) {
            // Create response body
            const body = '<html>Hello World!</html>';
            // Calculate correct Content-Length
            const contentLength = Buffer.byteLength(body);
            // Send proper HTTP response with correct Content-Length
            const response = `HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: ${contentLength}
Connection: close

${body}`;
            socket.write(response);
            socket.end(); // Close connection after response
        } else {
            // Handle other requests
            socket.write(`You sent: ${data.toString()}`);
        }
    });
    
    // Handle connection close
    socket.on('end', () => {
        console.log('Client disconnected');
    });
    
    // Handle errors
    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server listening on port 3000');
})