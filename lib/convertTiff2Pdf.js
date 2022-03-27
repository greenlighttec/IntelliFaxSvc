const tiff2pdf = require('tiff2pdf');

var convertTiff2Pdf = function (tiffFile) {

	tiff2pdf(tiffFile,'../uploaded_files/pdfs', function(result){
	   console.log(result);
	});

}


module.exports = convertTiff2Pdf
