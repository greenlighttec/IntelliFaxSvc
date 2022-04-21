const tools = require('./lib/tools.js');
const clients = require('./lib/admin/ClientAccounts.js');
const dbCommands = require('./lib/databaseCommands');
const devices = require('./lib/admin/Devices.js');

var getAPICall = function (req, res, next) {

	switch (req.path) {

	        case "/admin/api/getallaccounts":
		 //establish ClientID list associated with the user
		 var sessionId =  req.cookies.sessionId
                 dbCommands.apiLookupClientsBySession(sessionId)
                 .then(returnedData =>  res.status(200).send(returnedData))
                 .catch(error => res.status(400).send(error))

       		 break;

                case "/admin/api/getalldevices":
                 //establish ClientID list associated with the user
                 var sessionId =  req.cookies.sessionId
		dbCommands.apiLookupAllDevices(sessionId)
		.then(returnedData => res.status(200).send(returnedData))
		.catch(error => res.status(400).send(error))
                /*  clients.findClientsByUserScope(sessionId, (err,result) => {
                 if (result[0].dataValues.id == 0) {
                         devices.findAllByStatement({attributes: ['id', 'clientid', 'name', 'macaddr', 'line1', 'line2', 'username', 'createdAt', 'updatedAt']}, (device) => {
                         //console.log(client);
                         res.status(200).send(device)
                         });
                 } else { 
			devices.findAllByStatement({attributes: ['id', 'clientid', 'name', 'macaddr', 'line1', 'line2', 'username', 'createdAt', 'updatedAt'], where: {clientid: result[0].dataValues.id}}, (device) => {
				res.status(200).send(device) 
			});
		   }

                 }); */

                 break;

		case "/admin/api/getallphonenumbers":
                 var sessionId =  req.cookies.sessionId
		dbCommands.apiLookupAllPhoneNumbers(sessionId)
		 .then(returnedData => 	res.status(200).send(returnedData))
		 .catch(error => res.status(400).send(error))
		break;

		case "/admin/api/getallusers":
		var sessionId =  req.cookies.sessionId
		dbCommands.apiLookupAdminUsers(sessionId)
		 .then(returnedData => res.status(200).send(returnedData))
		 .catch(error => res.status(403).send(error))

		break;
		case "/admin/logout":
		  dbCommands.userLogout(req.cookies.sessionId, (result) => {
			res.status(200).redirect('/login')})
		  break;
        	default:
		 res.locals.sendCode = '404'
		 next()
        	 break;

	}
	}

var postAPICall = function (req, res, next) {

        switch (req.path) {
		//This entire endpoint needs to be updated to use dbCommands

                case "/admin/api/createAccount":
		 var accountId = req.body.accountId
		 var accountName = req.body.accountName
                 if (accountId && accountName) {clients.updateRecordByWhereStatement({id: accountId},{clientname: accountName},(err,result) => {

			if (err) {
                                res.render('admin/template/success', {obj: {result: 'Failed', method: 'Update', data: err}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.send(html)}
                                });
			} else if (result) {
			        res.render('admin/template/success', {obj: {result: 'Success', method: 'Update', data: result}}, (err, html) => {
        			        if (err) {console.log(err);
                       			 res.status(404).redirect('/404')
                			}
                			else {res.send(html)}
	        		});
			} else {
                                res.render('admin/template/success', {obj: {result: 'Failed', method: 'Update', data: 'Unknown Error'}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.send(html)}
                                });
			}
		 })}

		 else {
		   if (accountName) {
			clients.create(accountName,(err,result) => {
                        if (err) {
                                res.render('admin/template/success', {obj: {result: 'Failed', method: 'Create', data: err}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.send(html)}
                                });
                        } else if (result) {
                                res.render('admin/template/success', {obj: {result: 'Success', method: 'Create', data: result}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.send(html)}
                                });
                        }

		 	})}

		 else {

                                res.render('admin/template/success', {obj: {result: 'Failed', method: 'Create', data: {errorMessage: 'Account Name must be specified'}}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.status(400).send(html)}
                                });

		   }
     }
                 break;

		case "/admin/api/deleteAccount":
		 var accountId = req.body.accountId
		 var accountName = req.body.accountName
		 if (accountId && accountName) {
			clients.deleteClientByWhereStatement({where: {id: accountId}}, (err,result) => {
                        if (err) {
                                res.render('admin/template/success', {obj: {result: 'Failed', method: 'Delete', data: err}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.send(html)}
                                });
                        } else if (result) {
                                res.render('admin/template/success', {obj: {result: 'Success', method: 'Delete', data: result}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.send(html)}
                                });
                        }
		 });
		 } else {
                                     res.render('admin/template/success', {obj: {result: 'Failed', method: 'Delete', data: {errorMessage: 'Account Name must be specified'}}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.status(400).send(html)}
                                });
     
     }
		 break;
		// Until here
		case "/admin/login":
		 let username = req.body.loginUsername
		 let password = req.body.loginPassword
		    dbCommands.verifyUserExists(username, (pendingUser) => {
		      if (pendingUser) {
		           dbCommands.authenticateUser(pendingUser.id,password, (result) => {
		           if (result) {
		                   res.locals.clientid = pendingUser.clientid
		                   res.cookie('sessionId',result)
		                   res.cookie('clientid',pendingUser.clientid)
		                   res.cookie('authorized',true)
		                   //console.log('Authentication Successful! Username: ' + user.name + 'ClientID: ' + pendingUser.clientid);
		                   res.redirect('/admin/')
		           } else {
		                   console.log('WARNING! AUTHENTICATION FAILURE! 401 RETURNED');
		                   console.log('Failed Username is ' + username);
		                   res.status(401).send("Login Failure, invalid username or password");
		                   return;
	                   }
		           })}
		      else {
		       console.log('ERROR! Username ' + user.name + ' does not exist!');
		       res.status(401).send("Login Failure, invalid username or password");
		      }
		   });
		 break;

		default:
                 res.status(404).redirect('/404');
                 break;

        }
}


module.exports = {
	getAPICall: getAPICall,
	postAPICall: postAPICall
}
