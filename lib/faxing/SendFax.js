// Sending fax
const tools = require('../tools.js');
const convertTiff2Pdf = require('./convertTiff2Pdf.js');
const multer = tools.multer;
const upload = tools.tiffUpload;
const request = tools.request;

function telnyxFriendlyNumber(number) {
	if (number[0] == '+' && number[1] == '1') {return number}
	else if (number[0] == '1') {return `+${number}`}
	else {return `+1${number}`}
}


function sendTelnyxFax(calledNumber, callingNumber, pdfFile) {
	const telnyx = require(tools.basePath + 'secrets/creds.json').telnyx
	var publicPdfFile = pdfFile.replace(tools.basePath, tools.baseHostname)
	var toNumber = telnyxFriendlyNumber(calledNumber)
	var fromNumber = telnyxFriendlyNumber(callingNumber)

	var options = { method: 'POST',
	  url: tools.telnyxSendFaxUrl,
	  headers:
	   { 'cache-control': 'no-cache',
	     'authorization': 'Bearer ' + telnyx.telnyxapikey,
	     'content-type': 'application/x-www-form-urlencoded' },
	  form:
	   { media_url: publicPdfFile,
	     connection_id: telnyx.telnyxappid,
	     to: toNumber,
	     from: fromNumber } };


	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  console.log(body);
	});



}

var sendFax = function (req, res, next) {
	upload(req, res, function (err) {
	 if (err) { console.log(err) }
	else {
		var calledNumber = req.params.callednumber
		var callingNumber = req.body.CallingNumber
		var callingStationID = req.body.CallingStationID
		var pageCount = req.body.PageCount
		var tiffFile = tools.basePath + req.files.path

		//insert database logging information here
		console.log(`WARNING! Outbound Fax detected. From ${callingNumber} - ${callingStationID}. Pages: ${pageCount}`);
		console.log('FAX TO: ' + calledNumber + '. Received the following file.')
		//console.log(req.files)
		convertTiff2Pdf(req.files[0].path, (data) => {
		 console.log(`Need to send ${data.outfile} to ${calledNumber} using telephone line ${callingNumber}`)
		sendTelnyxFax(calledNumber, callingNumber,data.outfile)
		});
		next()
	}
})
}

module.exports = sendFax
