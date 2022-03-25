const basicAuth = require('basic-auth');
const database = require('../secrets/database.json');

var authenticateUsers = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    console.log('WARNING! Empty Auth Sent.');
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }

  if (database[user.name]) {
    if (user.pass == database[user.name].password) {
	res.locals.deviceMac = database[user.name].devicemap
	console.log('Authentication Successful! Username: ' + user.name);
 	next();
    } else {
      console.log('WARNING! AUTHENTICATION FAILURE! 401 RETURNED');
      console.log('Failed Username is ' + user.name);
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
     }
  } else {
    console.log('ERROR! Username ' + user.name + ' does not exist!');
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
  }

}

module.exports = authenticateUsers
