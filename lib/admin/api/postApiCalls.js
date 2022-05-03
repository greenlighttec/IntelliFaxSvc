const tools = require('../../tools.js');
const dbCommands = require('../../databaseCommands');
const devices = require('../Devices.js');

var sqlUpdateStatement = {}

function skipUndefinedValuesForSequelize(keyToAdd,valueToAdd) {
        sqlUpdateStatement[keyToAdd] = valueToAdd
}

module.exports = function (req, res, next) {

        switch (req.path) {
                // Customers Endpoints
                case "/admin/api/createAccount":
		 var accountId = req.body.accountId
		 var accountName = req.body.accountName
                 if (accountId && accountName) { // Update existing customer
                         
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
		   if (accountName) { // Create new Customer
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
		 else { // No details specified, fail.

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
		 if (accountId && accountName) { // Delete customer
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

                // User Endpoints
                case "/admin/api/createUsers":
                        var userId = req.body.userId
                        if (req.body.userName) {skipUndefinedValuesForSequelize('username',req.body.userName)} //var userName = 
                        if (req.body.userPassword) {skipUndefinedValuesForSequelize('password',req.body.userPassword)} //var userPassword = 
                        if (req.body.firstName) {skipUndefinedValuesForSequelize('firstname',req.body.firstName)} //var userFirstName = 
                        if (req.body.lastName) {skipUndefinedValuesForSequelize('lastname',req.body.lastName)} //var userLastName = 
                        if (req.body.clientId) {skipUndefinedValuesForSequelize('clientid',req.body.clientId)} //var userClientId = 
                        // First check if a UserId exists so we know if we're doing an Udpate or Create. If its a Create we need a password.
                        // if a password exists then we're going to set it, if it doesn't exist we'll skip it and update other record.
                         if (userId) { //This is an update of an existing user
                          dbCommands.apiUpdateRecordByStatement('Users',userId,sqlUpdateStatement)
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
                                 if (sqlUpdateStatement.username && sqlUpdateStatement.password) {
                                        dbCommands.apiCreateRecordByStatement('Users',sqlUpdateStatement)
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
                                        res.render('admin/template/success', {obj: {result: 'Failed', method: 'Create', data: {errorMessage: 'Username and Password must be specified'}}}, (err, html) => {
                                                if (err) {console.log(err);
                                                 res.status(404).redirect('/404')
                                                }
                                                else {res.status(400).send(html)}
                                        });
                                 } 
                         }                
                 break;
                case "/admin/api/deleteUser":
                        var userId = req.body.userId
                        if (userId) { // Delete User
                               dbCommands.apiDeleteRecordByStatement('Users',{where: {id: userId}})
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
                                            res.render('admin/template/success', {obj: {result: 'Failed', method: 'Delete', data: {errorMessage: 'User must be specified to delete'}}}, (err, html) => {
                                               if (err) {console.log(err);
                                                res.status(404).redirect('/404')
                                               }
                                               else {res.status(400).send(html)}
                                       });
            
                        }
                  break;

                // Device API Stuff
                case "/admin/api/createDevice" :
                        sqlUpdateStatement = {}
                        var deviceId = req.body.deviceId
                        if (req.body.deviceName) {skipUndefinedValuesForSequelize('name',req.body.deviceName)} //var deviceName = 
                        if (req.body.deviceMacaddr) {skipUndefinedValuesForSequelize('macaddr',req.body.deviceMacaddr)} //var deviceMacaddr = 
                        if (req.body.deviceAuthName) {skipUndefinedValuesForSequelize('username',req.body.deviceAuthName)} //var deviceAuthName = 
                        if (req.body.devicePassword) {skipUndefinedValuesForSequelize('password',req.body.devicePassword)} //var devicePassword = 
                        if (req.body.clientId) {skipUndefinedValuesForSequelize('clientid',req.body.clientId)} //var userClientId = 
                        if (req.body.deviceLine1) {skipUndefinedValuesForSequelize('line1',req.body.deviceLine1)} //var deviceLine1 = 
                        if (req.body.deviceLine2) {skipUndefinedValuesForSequelize('line2',req.body.deviceLine2)} //var deviceLine1 = 
                        // First check if a deviceId exists so we know if we're doing an Udpate or Create. If its a Create we need a password.
                        // if a password exists then we're going to set it, if it doesn't exist we'll skip it and update other record.
                         if (deviceId) { //This is an update of an existing user
                          dbCommands.apiUpdateRecordByStatement('Devices',deviceId,sqlUpdateStatement)
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
                                 if (sqlUpdateStatement.username && sqlUpdateStatement.password && sqlUpdateStatement.macaddr && sqlUpdateStatement.clientid) {
                                        dbCommands.apiCreateRecordByStatement('Devices',sqlUpdateStatement)
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
                                        res.render('admin/template/success', {obj: {result: 'Failed', method: 'Create', data: {errorMessage: 'Some required fields are missing'}}}, (err, html) => {
                                                if (err) {console.log(err);
                                                 res.status(404).redirect('/404')
                                                }
                                                else {res.status(400).send(html)}
                                        });
                                 } 
                         }
                        break;
		case "/admin/api/deleteDevice":
                        var deviceId = req.body.deviceId
                        if (deviceId) { // Delete Devic
                               dbCommands.apiDeleteRecordByStatement('Devices',{where: {id: deviceId}})
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
                                            res.render('admin/template/success', {obj: {result: 'Failed', method: 'Delete', data: {errorMessage: 'Device  must be specified to delete'}}}, (err, html) => {
                                               if (err) {console.log(err);
                                                res.status(404).redirect('/404')
                                               }
                                               else {res.status(400).send(html)}
                                       });

                        }
			break;

                // Admin Login Logic.
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
