// Sending fax
const tools = require('./tools.js');
const telnyx = tools.telnyx

function sendTelnyxFax(a,b,c,d,e) {
 telnyx.setAppInfo({
	name: 'IntelliComp Fax Service',
	version: '0.0.0.1c',
	url: 'https://faxapp.hostedpbx.intellicloud.tech'
 });



}

var sendFax = function (req, res, next) {
	var calledNumber = req.params.callednumber
	var callingNumber = req.body.CallingNumber
	var callingStationID = req.body.CallingStationID
	var pageCount = req.body.PageCount


	console.log(`WARNING! Outbound Fax detected. From ${callingNumber} - ${callingStationID}. Pages: ${pageCount}`);
	console.log('FAX TO: ' + calledNumber + '. Appears to be working.')
	next()
}

module.exports = sendFax
