// load required external modules
const express =  require('express');
const app  = express();
const body = require('body-parser');
const multer = require('multer');
const upload = multer({dest: './uploaded_files'});

// load required internal modules
const tools = require('./lib/tools.js');
const faxstatus = require('./lib/ReportDeliveryStatus.js');
const authenticateUsers = require('./lib/AuthenticateAccount.js');
const receiveFax = require('./lib/ReceiveFax.js');
const sendFax = require('./lib/SendFax.js');
const faxStatus = require('./lib/ReportDeliveryStatus.js');
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
	res.sendFile(tools.basePath + '/public/' + deviceMac + '.xml');

});


app.get('/AccountLoginDetail', authenticateUsers, (req, res) => {

	console.log(res.locals.deviceMac)
	res.contentType('application/xml');
	res.sendFile(tools.basePath + '/public/' + res.locals.deviceMac + '.xml');

});

app.get('/AuthorizeSendFax/:faxuser/:callednumber', (req,res) => {
	const faxUser = req.params.faxuser
	const calledNumber = req.params.callednumber
	console.log('Username ' + faxUser + ' tried calling phone number ' + calledNumber + '.');
	res.sendStatus(200);

});

app.get('/ReceiveFax', (req, res) => {

		//Incoming Function from Telnyx and  send fax to ATA to be printed by the fax machine.
		//Send API calls to https://rest-api.faxback.com/nsps/nsps.aspx?target=atamime
		//console.log(req.body)
		res.sendStatus(200);

});

app.use(express.json({limit: '2gb',parameterLimit: 1000000}));
app.use(express.urlencoded({ extended: true,limit: '2gb',parameterLimit: 1000000 }));

app.post('/ReceiveFax',upload.array('FaxImage'),receiveFax, (req, res) => {
	//console.log(req.files, req.body);
	res.send('<p>Received Form Data</p>');

});

app.post('/SendFax/:callednumber', authenticateUsers, upload.array('FaxImage'),sendFax, (req, res) => {
	res.sendStatus(200)
});

app.post('/DeliverImageStatus/:id', upload.none(),faxStatus.ReceiveAtaFaxReport, (req, res) => {
	
	res.sendStatus(200);
});

app.get('/ReportDeliveryStatus', (req,res) => {
		var answer = tools.multiply(a,b);
                res.send(`<h1>${paths[0]}</h1><p>Hooray you made it, your answer is ${answer}</p>`);
});

app.get('*', (req,res) => {
	var loggedDetails = 'WARNING! Invalid Page HTTP Request to ' + req.path + ' | Parameters sent are: ' + JSON.stringify(req.query)
	console.log(loggedDetails);
	res.sendStatus(404);

});


app.listen(port, host, () => {
	console.log(`Server is listening on http://${host}:${port}`);
});

