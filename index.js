// load required external libraries
const express =  require('express');
const app  = express();
const body = require('body-parser');
const cookieParser = require('cookie-parser');

// load shared libraries
const tools = require('./lib/tools.js');
const multer = tools.multer;
const upload = multer({dest: './uploaded_files'});

// load required faxing libraries
const faxstatus = require('./lib/faxing/ReportDeliveryStatus.js');
const authenticateAccounts = require('./lib/faxing/AuthenticateAccount.js');
const receiveFax = require('./lib/faxing/ReceiveFax.js');
const sendFax = require('./lib/faxing/SendFax.js');
const faxStatus = require('./lib/faxing/ReportDeliveryStatus.js');

// load required admin libraries
const authenticateUsers = require('./lib/admin/AuthenticateUsers.js');
const adminApiCalls = require('./adminapi.js');
const clients = require('./lib/admin/ClientAccounts.js');

const host = '0.0.0.0';
const port = 8340;

// Add Express App middleware
app.use(express.json({limit: '2gb',parameterLimit: 1000000}));
app.use(express.urlencoded({ extended: true,limit: '2gb',parameterLimit: 1000000 }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', tools.basePath + 'public')
app.use('admn/js',express.static(tools.basePath + 'public/admin/resources/js'))
app.use('admin/css',express.static(tools.basePath + 'public/admin/reosurces/css'))
app.use('admin/img',express.static(tools.basePath + 'public/admin/resources/img'))


app.get('/404/*', (req,res) => {

        var requestFile = tools.basePath + 'public' + req.path
        res.sendFile(requestFile, function (err) {
        if (err) {console.log(err)}
        });


});

app.get('/404', (req, res) => {

	res.redirect('/404/')

});

app.get('/AccountProvisioningDetail/:deviceMac', (req,res) => {

	const deviceMac = req.params.deviceMac;
	console.log('Provisioning request for MAC ' + deviceMac)
	res.contentType('application/xml');
	res.sendFile(tools.basePath + '/public/' + deviceMac + '.xml');

});


app.get('/AccountLoginDetail', authenticateAccounts, (req, res) => {

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
	});
});

app.get('/login/*', (req, res) => {
        var requestFile = tools.basePath + 'public' + req.path
        res.sendFile(requestFile,  (err) => {
                if (err) {console.log(err);
                if (err.statusCode == '404') {
                        res.status(404).redirect('/404');
                }
                }
        });
});

app.get('/login', (req, res) => {
	res.redirect('/login/')
});


app.post('/ReceiveFax', upload.array('FaxImage'), receiveFax, (req, res) => {
	//console.log(req.files, req.body);
	res.send('<p>Received Form Data</p>');

});

app.post('/SendFax/:callednumber', authenticateAccounts, sendFax, (req, res) => {
	res.sendStatus(200)
});

app.post('/DeliverImageStatus/:id', upload.none(), faxStatus.ReceiveAtaFaxReport, (req, res) => {
	res.sendStatus(200);
});

app.post('/admin/login', adminApiCalls.postAPICall, (req, res) => {

});

app.get('/admin/logout', adminApiCalls.getAPICall, (req, res) => {

});

app.get('/admin/api/*', authenticateUsers, adminApiCalls.getAPICall, (req, res) => {
	if (res.locals.sendCode == '404') {
		res.status(404).redirect('/404')
	}
	else {
		res.status(res.locals.sendCode).send(res.locals.sendData)
	   }

});

app.get('/admin/resources/*', authenticateUsers, (req, res) => {
	var requestFile = tools.basePath + 'public' + req.path
	res.sendFile(requestFile,  (err) => {
		if (err) {console.log(err);
		if (err.statusCode == '404') {
			res.status(404).redirect('/404')
		}
		}
	});

});

app.get('/admin', authenticateUsers, (req, res) => {
	res.render('admin/index', {path: req.path.split('/')[1]})
});

app.get('/admin/*', authenticateUsers, (req, res) => {
 var requestedPage = req.path.split('/')[2]
 switch (requestedPage) {
  case "faxlog":
    var templateObject = {cardHeaderName: "Fax Log", tableClassName: "DivFaxLog", formCreateApiEndpoint: "Faxlog", formId: "formUpdateFaxlog", frontEndScriptName: "faxlogtable.js", path: requestedPage};

  break;
  case "customers":
    var templateObject = {cardHeaderName: "Customer Accounts", tableClassName: "DivCustomer", formCreateApiEndpoint: "Account", formId: "formUpdateAccount", frontEndScriptName: "customertable.js", path: requestedPage};

  break;
  case "devices":
    var templateObject = {cardHeaderName: "Device", tableClassName: "DivDevices", formCreateApiEndpoint: "Device", formId: "formUpdateDevice", frontEndScriptName: "devicetable.js", path: requestedPage};

  break;
  case "phonenumbers":
    var templateObject = {cardHeaderName: "Fax Number", tableClassName: "DivFaxNumber", formCreateApiEndpoint: "Phonenumber", formId: "formUpdatePhonenumber", frontEndScriptName: "phonenumbertable.js", path: requestedPage};

  break;
  case "users":
    var templateObject = {cardHeaderName: "Users", tableClassName: "DivUsers", formCreateApiEndpoint: "Users", formId: "formUpdateUser", frontEndScriptName: "userstable.js", path: requestedPage};

  break;
  default:
    var templateObject = undefined;

 }

	res.render('admin/template/body', templateObject, (err, html) => {
		if (err) {console.log(err);
                        res.status(404).redirect('/404')
		}
		else {res.send(html)}
	});

});

app.post('/admin/api/*', authenticateUsers, adminApiCalls.postAPICall, (req, res) => {
	//console.log(req.body)
 // backURL=req.header('Referer') || '/admin/admin.html';
 // res.redirect(backURL);

});

app.get('*', (req,res) => {
	var loggedDetails = 'WARNING! Invalid Page HTTP Request to ' + req.path + ' | Parameters sent are: ' + JSON.stringify(req.query)
	console.log(loggedDetails);
	res.status(404).redirect('/404');

});


app.listen(port, host, () => {
	console.log(`Server is listening on http://${host}:${port}`);
});

