const fs = require('node:fs/promises');
const {Buffer} = require('node:buffer');
let debouncerTimer;

(async() => {	
	
 
	try {
		const  fileHandler = await fs.open('command.txt', 'r')
		
		fileHandler.on('change', async() => {
			clearTimeout(debouncerTimer);
			debouncerTimer = setTimeout(async()=> {
				await captureContent(fileHandler)
			},100);
		});
		const watcher = fs.watch("command.txt");
		for await (const event of watcher) {
			if (event.eventType == 'change') {
				fileHandler.emit('change');
				console.log("Some change in file")
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
	//	console.log(content.buffer.toString('utf-8'));
	await makeDecisions (content.buffer.toString('utf-8'));
};

async function makeDecisions ( filecontent ) {
	 console.log("File Content: ",filecontent);
	// create file
	// delete file
	// write content to a file
	// read content from a file
	// append content to a file
	// erase content from a file
	const argument = filecontent.split("$").pop();
	if (!argument) return;
	if (filecontent.includes("create file")) {

		await createFile(argument);
		
	} else if ( filecontent.includes("delete file")) {
		await deleteFile(argument);
	}	
}

async function fileExists(filename) {
	let fileHandler;
	try {
		fileHandler = await fs.open(filename, 'r');
		return true;
	} catch (error) {
		if (error.code === "ENOENT") return false;
	} finally {
		if (fileHandler) await fileHandler.close();
	}
}

 async function createFile (filename) {
	const result = await fileExists(filename);
	if (result) {
		console.log("File Already Exists");
		return;
	}
	if ( !result ) { 
		
		// file does not exit, create file
		try {
			const newFileHandler = await fs.open(filename, 'w');
			console.log(`File named ${filename} created successfully`);
			await newFileHandler.close();
		} catch (error) {
			console.log("Error creating file", error)
		}
	}
}

async function deleteFile (filename) {
	
}

