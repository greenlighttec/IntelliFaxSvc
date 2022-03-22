// load required external modules
const express =  require('express');
const app  = express();
const fs = require('fs').promises;
const url = require('url');
const path = require('path');
const telnyx = require('telnyx');
const body = require('body-parser');

// load required internal modules
const tools = require('./lib/tools.js');
const faxstatus = require('./lib/ReportDeliveryStatus.js');

const host = '0.0.0.0';
const port = 8340;


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

app.get('/AuthenticateAccount', (req,res) => {

                console.log('Heres the URL being hit in Account Authentication');
                console.log(urlObject);
		var answer = tools.multiply(a,b);
                var httpresponse = `<h1>${paths[0]}</h1><p>Hooray you made it, your answer is ${answer}</p>`;
		res.send(httpresponse)

});

app.post('/DeliverImage', (req, res) => {
		//Incoming Function only to send fax to ATA
		var answer = tools.multiply(a,b);
                var httpresponse = `<h1>${paths[0]}</h1><p>Hooray you made it, your answer is ${answer}</p>`;

		if (req.method == 'POST') {
			let data = ''
			req.on('data', chunk => {
				data += chunk;
			})
			req.on('end', () => {console.log(data);})

			httpresponse = httpresponse + '<h3>Data was posted</h3><p> ' + ' </p>'
		}

		res.send(httpresponse)

});


app.get('/ReportDeliveryStatus', (req,res) => {
		var answer = tools.multiply(a,b);
                res.send(`<h1>${paths[0]}</h1><p>Hooray you made it, your answer is ${answer}</p>`);
});




app.listen(port, host, () => {
	console.log(`Server is listening on http://${host}:${port}`);
});

