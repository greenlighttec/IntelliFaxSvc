// call in globalized options
const tools = require('../tools.js');
const fs = tools.fs;

// import libraries
const convertImage = require('./convertPdf2Tiff.js');
const request = tools.request;
const deliverImage = require('./DeliverImage.js');
const logFaxEntry  = require('../admin/FaxLog.js');
const faxPhoneNumbers = require('../admin/PhoneNumbers.js');

var ReceiveFax = function (req, res, next) {
 var faxAttempt = req.body.meta.attempt
 var telnyxData = req.body.data
 var faxState  = telnyxData.event_type
 var faxID = telnyxData.payload.fax_id
 var faxFrom = telnyxData.payload.from
 var faxTo = telnyxData.payload.to
 var pageCount = telnyxData.payload.page_count
 var faxDirection = telnyxData.payload.direction
 var originalMediaUrl = telnyxData.payload.original_media_url

 function faxDownloadedCallback(err, pdfFile) {
  console.log(pdfFile);
  convertImage(pdfFile,faxID,(tiffFile) => {deliverImage(tiffFile,faxFrom,faxTo) });


 }

 const downloadFaxMediaFile  = (mediaUrl, callback) => {
   let pdfPath = tools.basePath +'uploaded_files/pdfs/' + faxID + '.pdf';
   request.head(mediaUrl, (err, res, body) => {
     request(mediaUrl)
       .pipe(fs.createWriteStream(pdfPath))
       .on('close', () => { callback(null,pdfPath) })
   })
 }

switch (faxDirection) {

 case 'inbound':
 switch (faxState) {

	case 'fax.receiving.started':
	//let faxClientId = faxPhoneNumbers.
	//logFaxEntry.create(faxID,null,faxClientId,faxDeviceId,faxFrom,faxTo,faxDirection,faxAttempt,faxState,(err,faxLogRec) => console.log(faxLogRec));
	 //console.log(`WARNING! Inbound fax detected! From: ${faxFrom} To: ${faxTo} FaxID ${faxID}. Attempt #${faxAttempt}`)
	 break;


	case 'fax.media.processing.started':
         //console.log(`INFORMATION! Started receiving media. From: ${faxFrom} To: ${faxTo}. FaxID ${faxID}.  No of Pages ${pageCount}`)
         break;


	case 'fax.received':
         //console.log(`SUCCESS! Received fax From: ${faxFrom} To: ${faxTo}. FaxID ${faxID}.  No of Pages ${pageCount}. Attempt #${faxAttempt}.`)
	 //console.log('Download fax PDF from ' + telnyxData.payload.media_url)
	 downloadFaxMediaFile(telnyxData.payload.media_url, faxDownloadedCallback)
         break;

	case 'fax.email.delivered':
	 //console.log(`INFORMATION! Fax ${faxID} was delievered to email too.`);
	 break;

	default:
         //console.log(`ERROR! Unknown Event: ${faxState}. From: ${faxFrom} To: ${faxTo}. FaxID ${faxID}. No of Pages ${pageCount}`)
         break;

 }
	logFaxEntry.updateRecordByWhereStatement({telnyxfaxid: faxID},{result: faxState, attempts: faxAttempt},(err,record) => console.log(record))

 break;
 case 'outbound':
 switch (faxState) {
	case 'fax.queued':

	break;
	case 'fax.media.processed':

	break;
	case 'fax.sending.started':

	break;
	case 'fax.delivered':
	var privatePdfFile = originalMediaUrl.replace(tools.baseHostname, tools.basePath)
	tools.fs.unlinkSync(privatePdfFile)

	break;
	default:
	 console.log('OUTBOUND FAX DETECTED! Unknown State')
	 console.log(req.body)
 	break;
}

logFaxEntry.updateRecordByWhereStatement({telnyxfaxid: faxID},{result: faxState, attempts: faxAttempt},(record) => console.log(record))

break;

}


  next();



};

module.exports = ReceiveFax
