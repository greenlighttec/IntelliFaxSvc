// load required external libraries
const express =  require('express');
const app  = express();
const body = require('body-parser');

// load shared libraries
const tools = require('./lib/tools.js');
const multer = tools.multer;
const upload = multer({dest: './uploaded_files'});

// load required internal libraries
const faxstatus = require('./lib/faxing/ReportDeliveryStatus.js');
const authenticateUsers = require('./lib/faxing/AuthenticateAccount.js');
const receiveFax = require('./lib/faxing/ReceiveFax.js');
const sendFax = require('./lib/faxing/SendFax.js');
const faxStatus = require('./lib/faxing/ReportDeliveryStatus.js');


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

app.get('/uploaded_files/pdfs/*', (req, res) => {
	var requestFile = tools.basePath + req.path
	res.sendFile(requestFile, function (err) {
	if (err) {console.log(err)}
	else {tools.fs.unlinkSync(requestFile)}
	});
});

app.use(express.json({limit: '2gb',parameterLimit: 1000000}));
app.use(express.urlencoded({ extended: true,limit: '2gb',parameterLimit: 1000000 }));

app.post('/ReceiveFax', upload.array('FaxImage'), receiveFax, (req, res) => {
	//console.log(req.files, req.body);
	res.send('<p>Received Form Data</p>');

});

app.post('/SendFax/:callednumber', authenticateUsers, sendFax, (req, res) => {
	res.sendStatus(200)
});

app.post('/DeliverImageStatus/:id', upload.none(), faxStatus.ReceiveAtaFaxReport, (req, res) => {
	
	res.sendStatus(200);
});

app.get('*', (req,res) => {
	var loggedDetails = 'WARNING! Invalid Page HTTP Request to ' + req.path + ' | Parameters sent are: ' + JSON.stringify(req.query)
	console.log(loggedDetails);
	res.sendStatus(404);

});


app.listen(port, host, () => {
	console.log(`Server is listening on http://${host}:${port}`);
});

