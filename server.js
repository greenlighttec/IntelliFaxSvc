// load required external modules
const express =  require('express');
const app  = express();
const path = require('path');
const telnyx = require('telnyx');
const body = require('body-parser');
const basicAuth = require('express-basic-auth');

// load required internal modules
const tools = require('./lib/tools.js');
const faxstatus = require('./lib/ReportDeliveryStatus.js');
const authenticateUsers = require('./lib/AuthenticateAccount.js');
const host = '0.0.0.0';
const port = 8340;

// testing variable stuff ignore me please A.S.
var a = 5, b = 2

app.get('/AccountProvisioningDetail', (req,res) => {
	res.send('<html><head><title>404 - Page not found</title></head><body><h1>404 - Page not found</h1></body></html>');

});

app.get('/AccountProvisioningDetail/:deviceMac', (req,res) => {

	const deviceMac = req.params.deviceMac;
	console.log('Provisioning request for MAC ' + deviceMac)
	res.contentType('application/xml');
	res.sendFile(path.join(__dirname , '/public/' + deviceMac + '.xml' ));

});


app.get('/AccountLoginDetail', authenticateUsers, (req, res) => {

	console.log(res.locals.deviceMac)
	res.contentType('application/xml');
	res.sendFile(path.join(__dirname, '/public/' + res.locals.deviceMac + '.xml'));

});

app.post('/ReceiveFax', (req, res) => {

		//Incoming Function from Telnyx and  send fax to ATA to be printed by the fax machine.
		//Send API calls to https://rest-api.faxback.com/nsps/nsps.aspx?target=atamime
		console.log(req)

});


app.get('/ReportDeliveryStatus', (req,res) => {
		var answer = tools.multiply(a,b);
                res.send(`<h1>${paths[0]}</h1><p>Hooray you made it, your answer is ${answer}</p>`);
});




app.listen(port, host, () => {
	console.log(`Server is listening on http://${host}:${port}`);
});

