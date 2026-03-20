import createStream from './createReadStream.js';

const stream = new createStream('/home/kirti-anand/Anand/udemyNode/streams/creatingStreamsFromBuffers/oneMillionTexts.txt');

// Listen for data events
stream.on('data', (chunk) => {
    console.log(`Received chunk of size: ${chunk.length} bytes`);
    console.log(`Content: ${chunk.toString('utf8').substring(0, 50)}...`); // Show first 50 characters
    console.log('---');
});

// Listen for end event
stream.on('end', () => {
    console.log('File reading completed');
});

// Listen for error events
stream.on('error', (err) => {
    console.error('Error reading file:', err);
});

// Start reading the file
stream.read();
