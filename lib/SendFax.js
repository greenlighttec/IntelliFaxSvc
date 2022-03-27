// Sending fax
const telnyx = require('telnyx');

var sendFax = function (req, res, next) {
	var calledNumber = req.params.callednumber

	console.log(req.files, req.body);
	console.log('FAX TO: ' + calledNumber + '. Appears to be working.')
	next()
}

module.exports = sendFax
