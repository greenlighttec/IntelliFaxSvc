// bring in global variables
const tools = require('../tools.js');
const fs = tools.fs;

// pdf2tiff module is required, this is a modified copy of the public app, changed to allow compression.
const tiff2pdf = require('./tiff2pdf.js');

var convertTiff2Pdf = function (tiffFile,cb) {

 var exportPath = tools.basePath + 'uploaded_files/pdfs';
 var tiff2PdfCompressionString = '-j -q 25 -p letter -F';

	tiff2pdf(tiffFile,exportPath,tiff2PdfCompressionString,function(result){
	   //console.log(result);
	   if (result.message == 'close' && result.code == 0) {
	    fs.unlinkSync(tiffFile);
		//console.log(result);
	    	cb(result)
	  } else { console.log(result) }
	});

}


module.exports = convertTiff2Pdf
