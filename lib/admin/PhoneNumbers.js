const tools = require('../tools.js');
const PhoneNumbers = require(tools.basePath + 'models').PhoneNumbers;
const Clients = require(tools.basePath + 'models').Clients;

module.exports = {
	create(clientid,deviceid,phonenumber,line,cb) {
		return PhoneNumbers
		.create({
			clientid: clientid,
			deviceid: deviceid,
			phoenumber: phonenumber,
			line: line
		})
		.then(number => cb(null,number.dataValues))
		.catch(error => cb(error));
	},

	findByPk(id,cb) {
		PhoneNumbers.findByPk(id)
		.then(number => cb(null,number.dataValues))
		.catch(error => cb(error));
	},

	findOneByPhoneNumber(phonenumber,cb) {
		PhoneNumbers.findOne({where: {phonenumber: phonenumber}})
		.then(number => cb(null,number.dataValues))
		.catch(error => cb(error));
	},

	//for this function, make sure you pass the syntax of the where statement that you want to use. Follow https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
	findAllByStatement(statement,cb) {
		PhoneNumbers.findAll(statement)
		.then(number => cb(null,number))
		.catch(error => cb(error));
	},

	updateRecordByWhereStatement(whereStatement,updateDetails,cb) {
		PhoneNumbers.update(updateDetails,{where: whereStatement})
		.then(number => cb(null,number))
		.catch(error => cb(error));
	},

        findNumbersByClientScope(clientId, cb) {
                PhoneNumbers.findAll({
                include: [{
                  model: Clients,
                  where: {id: clientId},
                  required: true
                  }],
                 })
                .then(number => cb(null,number))
                .catch(error => cb(error));

        },

        deleteNumberByWhereStatement(whereStatement,cb) {
                PhoneNumbers.destroy(whereStatement)
                .then(number => cb(null,number))
                .catch(error => cb(error));
        }

};


