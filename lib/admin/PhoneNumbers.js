const tools = require('../tools.js');
const PhoneNumbers = require(tools.basePath + 'models').PhoneNumbers;
module.exports = {
	create(clientid,deviceid,phonenumber,line,cb) {
		return PhoneNumbers
		.create({
			clientid: clientid,
			deviceid: deviceid,
			phoenumber: phonenumber,
			line: line
		})
		.then(number => cb(number.dataValues))
		.catch(error => console.log(error));
	},

	findByPk(id,cb) {
		PhoneNumbers.findByPk(id)
		.then(number => cb(number.dataValues))
		.catch(error => console.log(error));
	},

	findOneByPhoneNumber(phonenumber,cb) {
		PhoneNumbers.findOne({where: {phonenumber: phonenumber}})
		.then(number => cb(number.dataValues))
		.catch(error => console.log(error));
	},

	//for this function, make sure you pass the syntax of the where statement that you want to use. Follow https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
	findAllByStatement(statement,cb) {
		PhoneNumbers.findAll(statement)
		.then(number => cb(number))
		.catch(error => console.log(error));
	},

	updateRecordByWhereStatement(whereStatement,updateDetails,cb) {
		PhoneNumbers.update(updateDetails,{where: whereStatement})
		.then(number => cb(number))
		.catch(error => console.log(error));
	}
};


