const convertImage = require('./convertPdf2Tiff.js');
const fs = require('fs');
const request = require("request");


var ReceiveFax = function (req, res, next) {
 var faxAttempt = req.body.meta.attempt
 var telnyxData = req.body.data
 var faxState  = telnyxData.event_type
 var faxID = telnyxData.payload.fax_id
 var faxFrom = telnyxData.payload.from
 var faxTo = telnyxData.payload.to
 var pageCount = telnyxData.payload.page_count

 function faxDownloadedCallback(err, pdfFile) {
  console.log(pdfFile);
  convertImage(pdfFile,faxID);


 }

 const downloadFaxMediaFile  = (mediaUrl, callback) => {
   let pdfPath = '/root/webapps/intellifaxsvc/uploaded_files/pdfs/' + faxID + '.pdf';
   request.head(mediaUrl, (err, res, body) => {
     request(mediaUrl)
       .pipe(fs.createWriteStream(pdfPath))
       .on('close', () => { callback(null,pdfPath) })
   })
 }

 switch (faxState) {

	case 'fax.receiving.started':
	 console.log(`WARNING! Inbound fax detected! From: ${faxFrom} To: ${faxTo} FaxID ${faxID}. Attempt #${faxAttempt}`)
	 break;


	case 'fax.media.processing.started':
         console.log(`INFORMATION! Started receiving media. From: ${faxFrom} To: ${faxTo}. FaxID ${faxID}.  No of Pages ${pageCount}`)
         break;


	case 'fax.received':
         console.log(`SUCCESS! Received fax From: ${faxFrom} To: ${faxTo}. FaxID ${faxID}.  No of Pages ${pageCount}. Attempt #${faxAttempt}.`)
	 console.log('Download fax PDF from ' + telnyxData.payload.media_url)
	 downloadFaxMediaFile(telnyxData.payload.media_url, faxDownloadedCallback)
         break;

	default:
         console.log(`ERROR! Unknown Event: ${faxState}. From: ${faxFrom} To: ${faxTo}. FaxID ${faxID}. No of Pages ${pageCount}`)
         break;

 }


  next();



/* Send this out to https://rest-api.faxback.com/nsps/nsps.aspx?target=atamime so the ATA prints it out
 var options = { method: 'POST',
   url: 'https://rest-api.faxback.com/nsps/nsps.aspx',
   qs: { target: 'atamime' },
   headers:
    { 'cache-control': 'no-cache',
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
   formData:
    { ServiceName: 'ConnectorService',
      Function: 'DeliverImage',
      AccountId: 'intellicompdemofax',
      PhoneNumber: '16674021037',
      MessageType: '',
      CallingNumber: '7071236',
      CallingStationId: '7071236',
      FaxImage: 
        { value: 'fs.createReadStream("output.tiff")',
          options: { filename: 'output.tiff', contentType: null } } } };

 request(options, function (error, response, body) {
   if (error) throw new Error(error);

   console.log(body);
 });

*/
};

module.exports = ReceiveFax
