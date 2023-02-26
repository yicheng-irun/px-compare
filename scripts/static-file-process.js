const fs = require('fs');

/**
 * @param {string} filePath
 */
function process(filePath) {
	console.log(filePath);
	const fileString = fs.readFileSync(filePath).toString();
	console.log(fileString);
	fs.writeFileSync(filePath, fileString.replace(/\/assets\//g, './assets/'));
}

process('./dist/web/index.html');
// Process('./dist/web/compare.html')
process('./dist/web/200.html');
