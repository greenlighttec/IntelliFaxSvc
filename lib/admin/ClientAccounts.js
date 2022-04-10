const tools = require('../tools.js');
const Clients = require(tools.basePath + 'models').Clients;
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
		.then(client => cb(client.dataValues))
		.catch(error => console.log(error));
	}
};


