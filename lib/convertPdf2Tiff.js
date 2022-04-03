// bring in global variables
const tools = require('./tools.js');

// pdftoimage module required for converting
const  pdftoimage = require('pdftoimage');
// bring in module for combining tiff to multi-page
const mp = require('tiff-multipage')

const fs = tools.fs;


var convertPdf2Tiff = function (pdfFile,faxID,callback) {
	const folderName = toosl.basePath + 'uploaded_files/tiffs/' + faxID

	//Create folder for FaxID
	fs.mkdirSync(folderName)
	// Returns a Promise
	pdftoimage(pdfFile, {
	  format: 'tiff',  // png, jpeg, tiff or svg, defaults to png
	  outdir: folderName   // path to output directory, defaults to current directory
	})
	.then(function(){
	// Merge TIFF Files to mult-page File
	let mpOutputFile = folderName + '.tiff'
	let filesArray = []
	let faxFileParts = fs.readdirSync(folderName);
	faxFileParts.forEach(function (faxFile) {filesArray.push(folderName + '/' + faxFile)})
		try {
			mp.JoinSync(mpOutputFile,filesArray)
		}
		catch (err) {
			console.log(err)
		}
	fs.rmSync(folderName, { recursive: true });
	console.log('Converted inbound fax with ' + faxID + ' to tiff');
	callback(mpOutputFile);
	})
	.catch(function(err){
	  console.log(err);
	});



};

module.exports = convertPdf2Tiff;
