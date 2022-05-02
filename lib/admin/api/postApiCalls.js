const tools = require('../../tools.js');
const dbCommands = require('../../databaseCommands');
const devices = require('../Devices.js');

module.exports = function (req, res, next) {

        switch (req.path) {
		//This entire endpoint needs to be updated to use dbCommands

                case "/admin/api/createAccount":
		 var accountId = req.body.accountId
		 var accountName = req.body.accountName
                 if (accountId && accountName) {
                         
                        dbCommands.apiUpdateRecordByStatement('Clients',accountId,{clientname: accountName})
                        .then(result => {
                                res.render('admin/template/success', {obj: {result: 'Success', method: 'Update', data: result}}, (err, html) => {
        			        if (err) {console.log(err);
                       			 res.status(404).redirect('/404')
                			}
                			else {res.send(html)}
	        		});                                
                        })
                        .catch(err => {
                                res.render('admin/template/success', {obj: {result: 'Failed', method: 'Update', data: err}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.send(html)}
                                });
                        })
                         
		 }

		 else {
		   if (accountName) {
                        dbCommands.apiCreateRecordByStatement('Clients',{clientname: accountName})
                        .then(result => {
                                res.render('admin/template/success', {obj: {result: 'Success', method: 'Create', data: result}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.send(html)}
                                });
                        })
                        .catch(err => {
                                res.render('admin/template/success', {obj: {result: 'Failed', method: 'Create', data: err}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.send(html)}
                                });
                        })
		 }
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
                        dbCommands.apiDeleteRecordByStatement('Clients',{where: {id: accountId}})
                        .then(result => {
                                res.render('admin/template/success', {obj: {result: 'Success', method: 'Delete', data: result}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.send(html)}
                                });
                        })
                        .catch(err => {
                                res.render('admin/template/success', {obj: {result: 'Failed', method: 'Delete', data: err}}, (err, html) => {
                                        if (err) {console.log(err);
                                         res.status(404).redirect('/404')
                                        }
                                        else {res.send(html)}
                                });
                        })

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
