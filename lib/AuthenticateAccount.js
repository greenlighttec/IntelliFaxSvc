const basicAuth = require('basic-auth');
const AuthUsers =  require('/root/webapps/intellifaxsvc/secrets/creds.json');
const DeviceUserMapping = require('/root/webapps/intellifaxsvc/secrets/devicemapping.json');


var authenticateUsers = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.pass == AuthUsers[user.name]) {
	res.locals.deviceMac = DeviceUserMapping[user.name]
 	next();
  } else {
    console.log('Username is ' + user.name);
    console.log('Password is ' + user.pass);
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}

module.exports = authenticateUsers
