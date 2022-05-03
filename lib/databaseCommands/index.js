// ./lib/databaseCommands/index.js
const tools = require('../tools.js');
const { Clients, Devices, FaxLogs, Users, PhoneNumbers } = require(tools.basePath + 'models');
const bcrypt = require('bcrypt');

// these are legacy modules that are being removed
const devices = require('../admin/Devices.js');
const users = require('../admin/UserAccounts.js');
const clients = require('../admin/ClientAccounts.js');
const numbers = require('../admin/PhoneNumbers.js');

function checkIfUserIsGlobalClient(user) {
	
	if (user.dataValues.clientid == 0) {
		return true;
	}
	else {
		return false;
	}
	
}

async function hashPassword (password,cb) {
	const saltRounds = 10;
  
	const hashedPassword = await new Promise((resolve, reject) => {
	  bcrypt.hash(password, saltRounds, function(err, hash) {
		if (err) reject(err)
		resolve(hash)
	  });
	})
  
	cb(hashedPassword)
}

function getClientIdFromSessionId (sessionId) {
	return new Promise(function (resolve,reject) {
		Users.findOne({attributes: ['clientid'], where: {session: sessionId}})
		.then(user => resolve(user))
		.catch(err => reject(err))
	})
	
}

function addOrUpdatePhoneNumbers(id,device) {
	console.log(device)
	var sqlStatements = []
	if (device.line1) {
		sqlStatements.push({clientid: device.clientid, phonenumber: device.line1, deviceid: id, line: 1})
	} 
	if (device.line2) {
		sqlStatements.push({clientid: device.clientid, phonenumber: device.line2, deviceid: id, line: 2})
	}
	console.log('Log attempt 1')
	console.log(sqlStatements)
	PhoneNumbers.bulkCreate(sqlStatements, {updateOnDuplicate: true})

}

module.exports = {

	// Below are the database functions performing the data lookup for the admin frontend API calls

	apiLookupClientsBySession: function (sessionId) {
		// define table columns to retrieve
		let dataAttributes = ['id','clientname','createdAt','updatedAt']
		return new Promise(function (resolve,reject) {
		getClientIdFromSessionId(sessionId)
		.then(user => {
			// Define Statement to query
			if (checkIfUserIsGlobalClient(user)) {
				var statement = {attributes: dataAttributes}		
			}
			else {
				var statement = {attributes: dataAttributes, where: {id: user.dataValues.clientid}}
			}
			// Query using built statement
			Clients.findAll(statement)
			.then(results => resolve(results))
			.catch(err => reject(err))
		})
		.catch(err => reject(err))
		})

	},

	// Outdated specific lookups that should be converted to generic statements at some point.
	apiLookupAllDevices: function (sessionId) {
		// define table columns to retrieve
		let clientAttributes = ['clientname']
		let deviceAttributes = ['id','name','macaddr','line1','line2','username','createdAt','updatedAt']
		return new Promise(function (resolve,reject) {
		getClientIdFromSessionId(sessionId)
		.then (user => {
			// build statement object for next call
			if (checkIfUserIsGlobalClient(user)) {
			var statement = {
				include: [{
				model: Clients,              
				attributes: clientAttributes
				}],
				attributes: deviceAttributes
				}
			} 
			else {
				var statement = {
					include: [{
						model: Clients,
						where: {id: user.dataValues.clientid},
						required: true,
						attributes: clientAttributes
						}],
					attributes: deviceAttributes
					}
			}
			// Use built statement to make the call
			Devices.findAll(statement)
			.then(results => resolve(results))
			.catch(err => reject(err))
		})
		.catch (err => reject(err))
			
		})
	},

	apiLookupAllPhoneNumbers: function (sessionId) {
		// Define attributes to query
		let clientAttributes = ['clientname']
		let deviceAttributes = ['name','macaddr']
		let numberAttributes = ['id','deviceid','phonenumber','line','createdAt','updatedAt']
		return new Promise(function (resolve,reject) {
			getClientIdFromSessionId(sessionId)
			.then(user => {
				if (checkIfUserIsGlobalClient(user)) {
					var statement = {
						include: [{
							model: Clients,              
							attributes: clientAttributes
						},{
							model: Devices,
							attributes: deviceAttributes
						}],
						attributes: numberAttributes
					}
				}
				else {
					var statement = {
						include: [{
							model: Clients,              
							attributes: clientAttributes,
							where: {id: user.dataValues.clientid},
							required: true
						},{
							model: Devices,
							attributes: deviceAttributes
						}],
						attributes: numberAttributes
					}				
				}
				PhoneNumbers.findAll(statement)
				.then(results => resolve(results))
				.catch(err => reject(err))
			})
			.catch(err => reject(err))

		})
	},

	apiLookupAdminUsers: function (sessionId) {
		let clientAttributes = ['clientname','id']
		let userAttributes = ['id','firstname','lastname','username','createdAt','updatedAt']
		return new Promise(function (resolve,reject) {
			getClientIdFromSessionId(sessionId)
			.then(user => {
				if (checkIfUserIsGlobalClient(user)) {
					var statement = {
						include: [{model: Clients, attributes: clientAttributes}],
						attributes: userAttributes
						}
					Users.findAll(statement)
					.then(results => resolve(results))
					.catch(err => reject(err))
				}
				else {
					reject({errorCode: '403', errorMessage: 'Your account does not have permissions to this', error: 'Access Denied!'})
				}			
			})
			.catch(err => reject(err))  
		})
	},
	
	apiLookupFaxLog: function (sessionId) {
		let clientAttributes = ['clientname']
		let deviceAttributes = ['name']
		let faxlogAttributes = ['telnyxfaxid','atafaxid','numberfrom','numberto','direction','attempts','result','createdAt','updatedAt']
		return new Promise(function (resolve,reject) {
		
		getClientIdFromSessionId(sessionId)     
		.then(user => {
			// build statement object for next call
			if (checkIfUserIsGlobalClient(user)) {
			var statement = {
				include: [{
				model: Clients,              
				attributes: clientAttributes
				},{
				model: Devices,
				attributes: deviceAttributes
				}],
				attributes: faxlogAttributes
				}
			} else { var statement = {
				include: [{
				model: Clients,
				where: {id: user.dataValues.clientid},
				required: true,              
				attributes: clientAttributes
				},{
				model: Devices,
				attributes: deviceAttributes
				}],
				attributes: faxlogAttributes
				}
			} 

			// Use built statement to make the call
			FaxLogs.findAll(statement)
				.then(results => resolve(results))
				.catch(err => reject(err))
				
			})
			.catch(err => {reject(err)})
		})
	},


	// Generic Create, Update, Delete Record Statements.

	apiUpdateRecordByStatement: function (recordType,recordId,statement) {
		return new Promise(function (resolve,reject) {
			switch (recordType) {
				case "Clients":
					Clients.update(statement, {where: {id: recordId} } )
					.then(client => resolve(client))
					.catch(err => reject(err))
					break;
				case "Devices":
					addOrUpdatePhoneNumbers(recordId,statement)
					if (statement.password) {
						hashPassword(statement.password, (hashedpassword) => {
							statement.password = hashedpassword
							Devices.update(statement, {where: {id: recordId} } )
							.then(device => resolve(device))
							.catch(err => reject(err))
						})
					} else {
						Devices.update(statement, {where: {id: recordId} } )
						.then(device => resolve(device))
						.catch(err => reject(err))
					}
					
					break;
				case "PhoneNumbers":
					PhoneNumbers.update(statement, {where: {id: recordId} } )
					.then(phoneNumber => resolve(phoneNumber))
					.catch(err => reject(err))
					break;
				case "Users":
					if (statement.password) {
						hashPassword(statement.password, (hashedpassword) => {
							statement.password = hashedpassword;
							Users.update(statement, {where: {id: recordId} } )
							.then(user => resolve(user))
							.catch(err => reject(err))
						})
					} else {
						Users.update(statement, {where: {id: recordId} } )
						.then(user => resolve(user))
						.catch(err => reject(err))
					}
					
					break;
				default:
					reject({errorCode: 500, errorMessage: "Incorrect Record Type specified"})
					break;
		
			}
		})	

	},

	apiCreateRecordByStatement: function (recordType,statement) {
		return new Promise(function (resolve,reject) {
			switch (recordType) {
				case "Clients":
					Clients.create(statement)
					.then(client => resolve(client))
					.catch(err => reject(err))
					break;
				case "Devices":
					
					if (statement.password) {
						hashPassword(statement.password, (hashedpassword) => {
							statement.password = hashedpassword
							Devices.create(statement)
							.then(device => resolve(device))
							.catch(err => reject(err))
						})
					} else {
						Devices.create(statement)
						.then(device => {
							addOrUpdatePhoneNumbers(device.id,device)
							resolve(device)
						})
						.catch(err => reject(err))	
					}
					break;
				case "PhoneNumbers":
					PhoneNumbers.create(statement)
					.then(phoneNumber => resolve(phoneNumber))
					.catch(err => reject(err))
					break;
				case "Users":
					if (statement.password) {
						hashPassword(statement.password, (hashedpassword) => {
							statement.password = hashedpassword
							Users.create(statement)
							.then(user => resolve(user))
							.catch(err => reject(err))
			
						})
					} else {
					Users.create(statement)
					.then(user => resolve(user))
					.catch(err => reject(err))
					}
					break;
				default:
					reject({errorCode: 500, errorMessage: "Incorrect Record Type specified"})
					break;
		
			}
		})	

	},

	apiDeleteRecordByStatement: function (recordType,whereStatement) {
		return new Promise(function (resolve,reject) {
			switch (recordType) {
				case "Clients":
					Clients.destroy(whereStatement)
					.then(client => resolve(client))
					.catch(err => reject(err))
					break;
				case "Devices":
					Devices.destroy(whereStatement)
					.then(device => resolve(device))
					.catch(err => reject(err))
					break;
				case "PhoneNumbers":
					PhoneNumbers.destroy(whereStatement)
					.then(phoneNumber => resolve(phoneNumber))
					.catch(err => reject(err))
					break;
				case "Users":
					Users.destroy(whereStatement)
					.then(user => resolve(user))
					.catch(err => reject(err))
					break;
				default:
					reject({errorCode: 500, errorMessage: "Incorrect Record Type specified"})
					break;
		
			}
		})	

	},


// Below are Authentication functions of either the Admin Panel or the Fax Gateway Devices

	// Device backend endpoints for lookups and auth
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

	// Admin backend user endpoints
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
