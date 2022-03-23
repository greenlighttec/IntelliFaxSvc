// load required external modules
const express =  require('express');
const app  = express();
const fs = require('fs').promises;
const url = require('url');
const path = require('path');
const telnyx = require('telnyx');
const body = require('body-parser');
const basicAuth = require('express-basic-auth');

// load required internal modules
const tools = require('./lib/tools.js');
const faxstatus = require('./lib/ReportDeliveryStatus.js');
//const AuthUsers =  require('./secrets/creds.json');
//const DeviceUserMapping = require('./secrets/devicemapping.json');
const authenticateUsers = require('./lib/AuthenticateAccount.js');
const host = '0.0.0.0';
const port = 8340;

// testing variable stuff ignore me please A.S.
var a = 5, b = 2

app.get('/AccountProvisioningDetail/:deviceMac', (req,res) => {

		const deviceMac = req.params.deviceMac
		if (deviceMac) {
			console.log('Provisioning request for MAC ' + deviceMac)
			res.contentType('application/xml');
			res.sendFile(path.join(__dirname , '/public/' + deviceMac + '.xml' ));
		}
		else {
			var answer = tools.multiply(a,b);
			var httpresponse = `<h1>${paths[0]}</h1><p>Hooray you made it, your answer is ${answer}</p>`;
			res.send(httpresponse)

		}

});


app.get('/AuthenticateAccount', authenticateUsers, (req, res) => {

	console.log(res.locals.deviceMac)
	res.contentType('application/xml');
	res.sendFile(path.join(__dirname, '/public/' + res.locals.deviceMac + '.xml'));

});

app.post('/DeliverImage', (req, res) => {

		//Incoming Function only to send fax to ATA
		var answer = tools.multiply(a,b);
                var httpresponse = `<h1>Deliver Image</h1><p>Hooray you made it, your answer is ${answer}</p>`;

		console.log(req)
		res.send(httpresponse)

});


app.get('/ReportDeliveryStatus', (req,res) => {
		var answer = tools.multiply(a,b);
                res.send(`<h1>${paths[0]}</h1><p>Hooray you made it, your answer is ${answer}</p>`);
});




app.listen(port, host, () => {
	console.log(`Server is listening on http://${host}:${port}`);
});

