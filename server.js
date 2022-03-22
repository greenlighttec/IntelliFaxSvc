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


const requestListener= function (req, res) {
	//console.log(req);
	const urlObject = req.path
	arr_paths = urlObject.split('/');
	paths = arr_paths.filter(x => x !== '');
	console.log(paths)

	// This breaks out the query string into a JS Object key/value hash of the queries. Wrap all logic around if statement.
	// See the example in "AccountProvisioningDetail" to see how to use this.
	/*if (urlObject.search) {
		paramsobj = {}
		let params = urlObject.search.replace('?','').split('&');
		for (const keyvaluepair of params) {
			key = keyvaluepair.split('=')[0];
			value = keyvaluepair.split('=')[1];
			paramsobj[key] = value;
		}
		console.log('Below is the object created manually.');console.log(paramsobj);
                console.log('Below is the object created automatically.');console.log(urlObject.query);

	};

	// temporarily used for design debugging, comment this out when in production. */
	var a=2,b=5 
	var paramsobj = req.query;
	var caseFound = true;

	switch (paths[0]) {

	case 'AccountProvisioningDetail':
		// Below is used as an example to indicate how to verify the parameter you need is provided
		/* if (paramsobj) {
			if (paramsobj.hasOwnProperty('a')) {var a = paramsobj.a}
			if (paramsobj.hasOwnProperty('b')) {var b = paramsobj.b}
		}
		console.log('Heres the URL being hit in Account Provisioning');
		console.log(urlObject); */

		let deviceMac = paths[1]
		if (deviceMac) {
			caseFound=false;
			console.log('Provisioning request for MAC ' + deviceMac)
			res.contentType('application/xml');
			res.sendFile(path.join(__dirname , '/public/' + deviceMac ));
		}
		else {
			var answer = tools.multiply(a,b);
			var httpresponse = `<h1>${paths[0]}</h1><p>Hooray you made it, your answer is ${answer}</p>`;
			break;
		}

	case 'AuthenticateAccount':
                console.log('Heres the URL being hit in Account Authentication');
                console.log(urlObject);
		var answer = tools.multiply(a,b);
                var httpresponse = `<h1>${paths[0]}</h1><p>Hooray you made it, your answer is ${answer}</p>`;
		break;

	case 'DeliverImage':
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

		break;

	case 'ReportDeliveryStatus':

		var answer = tools.multiply(a,b);
                var httpresponse = `<h1>${paths[0]}</h1><p>Hooray you made it, your answer is ${answer}</p>`;

		break;


	default:
		caseFound = false;
		//var answer = tools.multiply(5,4);
		//console.log(`Sorry path ${paths[0]} not found, your answer is ${answer}.`);
	        res.writeHead(404);
	        res.end('<html><head><title>IntelliFax App - 404 not found</title></head><body><h1>404 - Page Not Found</h1><p>The page you requested is not found</p></body></html>');



	}



	//console.log(urlObject);
	//console.log(req);
	//console.log(`Query is ${urlObject.search}`);

	if (caseFound) {
		res.writeHead(200);
		res.end(httpresponse);
	}
};

//const server = http.createServer(requestListener);



app.get('/*', requestListener);

app.listen(port, host, () => {
	console.log(`Server is listening on http://${host}:${port}`);
});

