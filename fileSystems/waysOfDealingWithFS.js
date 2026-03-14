/*
 const fs = require('node:fs/promises'); // default fs imports the callback apis

//======= Promise API =======
(async() => {
	try{
		await fs.copyFile("testFile.txt", "copiedPromiseFile.txt")
	} catch (err) {
		console.log(`Error: ${err}`);	
	}
})();
*/

/*
//====== Callback API =======
const fs = require('fs');

const callBack = () => {
	fs.copyFile('testFile.txt', 'copiedCallbackFile.txt', (err)=> {
		console.log("Error", err);
	})
};

callBack();
*/

//====== Syncronous APi ======
const fs = require('fs');

try {
	fs.copyFileSync('testFile.txt', 'copiedSyncFile.txt');
} catch (err) {
	console.log(err);
}
