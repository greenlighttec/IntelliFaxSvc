const tiff2pdf = require('./tiff2pdf.js');

var convertTiff2Pdf = function (tiffFile) {

	tiff2pdf(tiffFile,'/root/webapps/intellifaxsvc/uploaded_files/pdfs','-j -q 25 -p letter -F',function(result){
	   console.log(result);
	});

}


module.exports = convertTiff2Pdf
