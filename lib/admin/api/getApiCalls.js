const tools = require('../../tools.js');
const dbCommands = require(tools.basePath + '/lib/databaseCommands');


module.exports = function (req, res, next) {

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
		case "/admin/api/getfaxlog":
      var sessionId =  req.cookies.sessionId
      dbCommands.apiLookupFaxLog(sessionId)
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

	} //End Switch (req.path)
} //End getAPICall Function

