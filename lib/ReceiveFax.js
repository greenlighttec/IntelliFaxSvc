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

 var downloadFaxMediaFile = function(mediaUrl, cb) {
        let pdfFolder = '../uploaded_files/pdfs/';
        let pdfFile = fs.createWriteStream(pdfFolder + faxID + '.pdf');
        let stream = request({
          uri: mediaUrl,
          headers: {
           'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng;q=0.8',
           'Accept-Encoding': 'gzip, deflate, br',
           'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
           'Cache-Control': 'max-age=0',
           'Connection': 'keep-alive',
           'Upgrade-Insecure-Requests': '1',
           'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
         },
         gzip: true
         }, function(response) {
		response.pipe(pdfFile)
		file.on('finish', () => {
        //Convert Image to TIFF Here, and deliver TIFF to ata
        console.log(`The file is finished downloading.`);
        file.close(cb);
		 })

	}).on('error', function(err) {
		console.log(`Something happened: ${error}`);
	  });

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
	 downloadFaxMediaFile(telnyxData.payload.media_url)
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
