const fs = require('node:fs/promises');
const {Buffer} = require('node:buffer');
let debounceTimer;

(async() => {	
	
 
	try {
		const  fileHandler = await fs.open('command.txt', 'r')
		
		fileHandler.on('change', async() => {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(async()=> {
				try{
					await captureContent(fileHandler)
				} catch ( error ) {
					console.log(`Error reading file content: ${error}`)
				}
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

	} else if ( filecontent.includes("write to file")) {
		const sliceAt = argument.indexOf(" ");
		if (sliceAt === -1) {
			console.log("file was given no content in args");
			return;
		}

		const filename = argument.slice(0, sliceAt);
		const content  = argument.slice(sliceAt + 1);

		await writeFile(filename, content);
		
	}	
}

async function openFile ( filename ) {
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
	const fileExists  = await openFile(filename);
	if ( fileExists ) {
		console.log("File Already Exists");
		return;
	}

	// file does not exit, create file
	try {
		const newFileHandler = await fs.open(filename, 'w');
		console.log(`File named ${filename} created successfully`);
		await newFileHandler.close();
	} catch (error) {
		console.log("Error creating file", error)
	}
	
}

async function deleteFile (filename) {
	const fileExists = await openFile(filename);
	if (!fileExists) {
		console.log("File Not Found");
		return;
	}	
	await fs.unlink(filename);
	console.log("File Deleted Sucessfully");
}

async function writeFile ( filename , content ) {
	try {
		console.log(content);
		
		const file = await fs.open(filename, 'w');
		const contentBuffer = Buffer.from(content, 'utf-8');
		console.log(contentBuffer);
		await file.write(contentBuffer);
		console.log("Content has been written to file ", filename);
	} catch (error) {
		console.log("Error occured while writting to file", error);
	}
}
