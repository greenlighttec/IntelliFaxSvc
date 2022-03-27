// pdf2tiff module
const  pdftoimage = require('pdftoimage');
const fs = require('fs');
const mp = require('tiff-multipage')

var convertPdf2Tiff = function (pdfFile,faxID) {
	const folderName = '../uploaded_files/tiffs/' + faxID

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
	})
	.catch(function(err){
	  console.log(err);
	});



};

module.exports = convertPdf2Tiff;
