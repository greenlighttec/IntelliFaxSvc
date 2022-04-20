// ./lib/databaseCommands/index.js

const tools = require('../tools.js');
const devices = require('../admin/Devices.js');
const users = require('../admin/UserAccounts.js');
const clients = require('../admin/ClientAccounts.js');
const numbers = require('../admin/PhoneNumbers.js');
const bcrypt = require('bcrypt');

function retrieveKeyByValue(obj,valueName,valueValue) {
	let arr = Object.entries(obj)
        let key = arr.filter(x => x[1][valueName] === valueValue)[0][0]
	return key
}

module.exports = {

//Below are the database functions performing the data lookup for the admin frontend API calls

	apiLookupClientsBySession: function (sessionId) {

	return new Promise(function (resolve,reject) {

                 clients.findClientsByUserScope(sessionId, (err,result) => {
		 if (err) {reject(err)}
                 else if (result[0].dataValues.id == 0) {
                         clients.findAllByStatement({}, (err,client) => {
                           if (err) {reject(err) } 
			   //console.log(client);
                           else {resolve(client)}
                         });
                 } else { reolve(result) }

                 });
	})



	},

	apiLookupRetrieveAllPhoneNumbers: function (sessionId) {
		return new Promise(function (resolve,reject) {
		    users.findAllByStatement({attributes: ['clientid'], where: {session: sessionId}}, (err,user) => {
			if (err) {reject(err)} else {
			numbers.findNumbersByClientScope(user[0].dataValues.clientid, (err, result) => {
			  if (err) {reject(err)}
			  else if (result[0].dataValues.id == 0) {
				numbers.FindAllByStatement({}, (err,number) => {
					if (err) {reject(err)} else {resolve(number)}
				});
			  } else { resolve(result) }
			});
		    }
		});
	})
	},

// Below are Authentication functions of either the Admin Panel or the Fax Gateway Devices
		/* Don't think this is used anymore
	lookupAccountIdByFaxNo: function (faxNo) {
		//let arr = Object.entries(database)
		//let res = arr.filter(x => x[1].faxnumber === faxNo)[0][0]
		let res = retrieveKeyByValue(database,'faxnumber',faxNo)
		return res
	}, */

	lookupMacAddrByAccount: function (username) {
		devices.findAllByStatement({where: {username: username}, attributes: ['macaddr']}, (err,device) => {
			if (device) {return device.macaddr}
		//return database[username].devicemap
		});
	},

	verifyAccountExists: function (username,cb) {
		devices.findAllByStatement({attributes: ['id','macaddr'], where: {username: username}}, (err,device) => {
			if (device) { cb(device[0].dataValues) }
			else { cb(false) }
		});
	},

	authenticateAccount: function(macaddr, password, cb) {
		devices.findAllByStatement({attributes: ['password'], where: {macaddr: macaddr}}, async (err,device) => {
			let comparedPassword = await bcrypt.compare(password, device[0].dataValues.password)
			if (comparedPassword) { cb(true); }
			else { cb(false); }
		});
	},


        verifyUserExists: function (username,cb) {
                users.findAllByStatement({attributes: ['id','clientid'], where: {username: username}}, (err,user) => {
                        if (user) { cb(user[0].dataValues) }
                        else { cb(false) }
                });
        },

        authenticateUser: function(userid, password, cb) {
                users.findAllByStatement({attributes: ['password'], where: {id: userid}}, async (err,user) => {
                        let comparedPassword = await bcrypt.compare(password, user[0].dataValues.password)
                        if (comparedPassword) {
				var sessionId = '_' + (Math.floor(Math.random() * 10000000)).toString(36) + Math.random().toString(36) + Math.random().toString(36) + Math.random().toString(36) + Math.random().toString(36)
				users.updateRecordByWhereStatement({id: userid}, {session: sessionId}, (err,updatedUser) => {
					cb(sessionId)
				})
			}
                        else { cb(false); }
                });
        },

	findClientIdBySessionId: function(sessionid, cb) {
		users.findAllByStatement({attributes: ['clientid','session'], where: {session: sessionid}}, (err,user) => {
			if (user) {
				cb(user)
			} else {cb(false)}
		})
	},

	userLogout: function(sessionid, cb) {
		users.updateRecordByWhereStatement({session: sessionid}, {session: null}, (err,updatedUser) => cb(updatedUser))
	}

}
