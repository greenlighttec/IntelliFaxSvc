module.exports = {

	FaxReport : function (faxid) {
		return CheckTelnyxFaxStatus(faxid);
	}


}


function CheckTelnyxFaxStatus(faxid) {
	//do some stuff to reach out to telnyx
	return "Fax delivered successfully";

}

