const tools = require('./tools.js');
const dbfile = tools.basePath + 'secrets/database.json';
const database = require(dbfile);
const devices = require('./admin/Devices.js');
const bcrypt = require('bcrypt');

function retrieveKeyByValue(obj,valueName,valueValue) {
	let arr = Object.entries(obj)
        let key = arr.filter(x => x[1][valueName] === valueValue)[0][0]
	return key
}

module.exports = {


	lookupAccountIdByFaxNo: function (faxNo) {
		//let arr = Object.entries(database)
		//let res = arr.filter(x => x[1].faxnumber === faxNo)[0][0]
		let res = retrieveKeyByValue(database,'faxnumber',faxNo)
		return res
	},

	lookupMacAddrByUsername: function (username) {
		devices.findAllByStatement({where: {username: username}, attributes: ['macaddr']}, (device) => {
			if (device) {return device.macaddr}
		//return database[username].devicemap
		});
	},

	verifyUserExists: function (username,cb) {
		devices.findAllByStatement({attributes: ['id','macaddr'], where: {username: username}}, (device) => {
			if (device) { cb(device[0].dataValues) }
			else { cb(false) }
		});
	},

	authenticateUser: function(macaddr, password, cb) {
		devices.findAllByStatement({attributes: ['password'], where: {macaddr: macaddr}}, async (device) => {
			let comparedPassword = await bcrypt.compare(password, device[0].dataValues.password)
			if (comparedPassword) { cb(true); }
			else { cb(false); }
		});
	}



}
