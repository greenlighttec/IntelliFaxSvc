const basicAuth = require('basic-auth');
const AuthUsers =  require('/root/webapps/intellifaxsvc/secrets/creds.json');
const DeviceUserMapping = require('/root/webapps/intellifaxsvc/secrets/devicemapping.json');


var authenticateUsers = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    console.log('WARNING! Empty Auth Sent.');
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.pass == AuthUsers[user.name]) {
	res.locals.deviceMac = DeviceUserMapping[user.name]
	console.log('Authentication Successful! Username: ' + user.name);
 	next();
  } else {
    console.log('WARNING! AUTHENTICATION FAILURE! 401 RETURNED');
    console.log('Failued Username is ' + user.name);
    //console.log('Failed Password is ' + user.pass);
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}

module.exports = authenticateUsers
