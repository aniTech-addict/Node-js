const fs = require('node:fs/promises');
const {Buffer} = require('node:buffer');



(async() => {	
	
 
	try {
		const  fileHandler = await fs.open('command.txt', 'r')
		
		 fileHandler.on('change', () => captureContent(fileHandler));
		
		const watcher = fs.watch("command.txt");
		for await (const event of watcher) {
			if (event.eventType == 'change') {
				fileHandler.emit('change');
			}
	
		}

	} catch (error) {
		console.log("Error", error);
	}
})();
	

const captureContent =  async(fileHandler)=> {
	const  fileStats = await fs.stat('./command.txt');
	const fileSize = fileStats.size;
	const buffer = Buffer.alloc(fileSize);
	const offset = 0;
	const position = 0;
	const content = await fileHandler.read(buffer, offset, fileSize, position); 
	console.log(content.buffer.toString('utf-8'));
	
};


