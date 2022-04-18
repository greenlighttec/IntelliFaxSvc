const tools = require('../tools.js');
const Clients = require(tools.basePath + 'models').Clients;
const Users = require(tools.basePath + 'models').Users;

module.exports = {
	create(clientname,cb) {
		return Clients
		.create({
			clientname: clientname
		})
		.then(client => cb(client.dataValues))
		.catch(error => console.log(error));
	},

	findByPk(id,cb) {
		Clients.findByPk(id)
		.then(client => cb(client.dataValues))
		.catch(error => console.log(error));
	},

	findOneByClientname(clientname,cb) {
		Clients.findOne({where: {clientname: clientname}})
		.then(client => cb(client.dataValues))
		.catch(error => console.log(error));
	},

	//for this function, make sure you pass the syntax of the where statement that you want to use. Follow https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
	findAllByStatement(statement,cb) {
		Clients.findAll(statement)
		.then(client => cb(client))
		.catch(error => console.log(error));
	},

        updateRecordByWhereStatement(whereStatement,updateDetails,cb) {
                Clients.update(updateDetails,{where: whereStatement})
                .then(client => cb(client))
                .catch(error => console.log(error));
        },

	findClientsByUserScope(sessionId, cb) {
		Clients.findAll({
		include: [{
		  model: Users,
		  where: {session: sessionId},
		  required: true
		  }],
		 })
		.then(client => cb(client))
		.catch(error => console.log(error));

	},

        deleteClientByWhereStatement(whereStatement,cb) {
                Clients.destroy(whereStatement)
                .then(client => cb(client))
                .catch(error => console.log(error));
        }



};


