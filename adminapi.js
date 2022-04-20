const tools = require('./lib/tools.js');
const clients = require('./lib/admin/ClientAccounts.js');
const dbCommands = require('./lib/databaseCommands.js');
const devices = require('./lib/admin/Devices.js');

var getAPICall = function (req, res, next) {

	switch (req.path) {

	        case "/admin/api/getallaccounts":
		 //establish ClientID list associated with the user
		 var sessionId =  req.cookies.sessionId
		 clients.findClientsByUserScope(sessionId, (err,result) => {
		 if (result[0].dataValues.id == 0) {
	                 clients.findAllByStatement({}, (err,client) => {
                         //console.log(client);
                         res.status(200).send(client)
                 	 });
		 } else { res.status(200).send(result) }

		 });

       		 break;

                case "/admin/api/getalldevices":
                 //establish ClientID list associated with the user
                 var sessionId =  req.cookies.sessionId
                 clients.findClientsByUserScope(sessionId, (err,result) => {
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

                 });

                 break;

		case "/admin/api/getallphonenumbers":
		
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

                case "/admin/api/createAccount":
		 var accountId = req.body.accountId
		 var accountName = req.body.accountName
                 if (accountId && accountName) {clients.updateRecordByWhereStatement({id: accountId},{clientname: accountName},(result) => {
			if (result) {
				res.sendStatus(200).redirect(req.header('Referer'))
			} else {res.sendStatus(400).redirect(req.header('Referer'))} //.send("Updated failed, ID or AccountName is null")}
		 })}

		 else {
		   if (accountName) {
			clients.create(accountName,(result) => {
			res.status(200).redirect(req.header('Referer'))
		 	})}
		  else {res.status(400).redirect(req.header('Referer')) } //.send("Customer Account Creation failed, account name must be specified")}
		   }
                 break;

		case "/admin/api/deleteAccount":
		 var accountId = req.body.accountId
		 var accountName = req.body.accountName
		 if (accountId && accountName) {
			clients.deleteClientByWhereStatement({where: {id: accountId}}, (result) => {
                        if (result) {
                                res.status(200).redirect(req.header('Referer'))
                        } else {res.status(400).redirect(req.header('Referer')) } //.send("Updated failed, ID or AccountName is null")}
		 });
		 } else {res.status(400).redirect(req.header('Referer')).send("Customer Account Deletion failed, account name must be specified")}
		 break;

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
