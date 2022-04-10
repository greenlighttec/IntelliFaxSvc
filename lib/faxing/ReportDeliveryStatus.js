module.exports = {

	CheckTelnyxFaxReport : function (req, res, next) {
		return CheckTelnyxFaxStatus(faxid);
		next()
	},

	ReceiveAtaFaxReport: function (req, res, next) {
		// do somethings here.
		var faxId = req.params.id
		var faxStatus = req.body.delivered
		var faxRetries = req.body.retries
		console.log('Received status for faxID: ' + faxId + '. Fax Delivered: ' + faxStatus + '.  Number of times retried: ' + faxRetries);

		next()
	}


}


function CheckTelnyxFaxStatus(faxid) {
	//do some stuff to reach out to telnyx
	return "Fax delivered successfully";

}

