const tools = require('../tools.js');
const basicAuth = require('basic-auth');
const dbCommands = require('../databaseCommands.js');

function doAuthorization (res,next) {

  res.status(401).redirect('/login');

}





var authenticateUsers = function (req, res, next) {
//  var user = basicAuth(req);
  var cookie = req.cookies

 if (cookie.sessionId) {
	dbCommands.findClientIdBySessionId(cookie.sessionId, (foundUser) => {
		if (foundUser.length == 1) {
			//console.log('User is already authed no reauth required');
			next()
		} else  {console.log('WARNING! SessionID: ' + cookie.sessionId + ' is invalid or expired, re-auth is required'); doAuthorization(res, next);}
	})
 }

 else {doAuthorization(res, next)}

}

module.exports = authenticateUsers
