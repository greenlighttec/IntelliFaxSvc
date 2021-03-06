const tools = require('../tools.js');
const FaxLogs = require(tools.basePath + 'models').FaxLogs;
module.exports = {
	create(telnyxfaxid,atafaxid,clientid,deviceid,phonenumber,numberto,direction,attempts,result,cb) {
		return FaxLogs
		.create({
			telnyxfaxid: telnyxfaxid,
			atafaxid: atafaxid,
			clientid: clientid,
			deviceid: deviceid,
			numberfrom: phonenumber,
			numberto: numberto,
			direction: direction,
			attempts: attempts,
			result: result
		})
		.then(faxlog => cb(null,faxlog.dataValues))
		.catch(error => cb(error));
	},

	findByPk(id,cb) {
		FaxLog.findByPk(id)
		.then(faxlog => cb(null,faxlog.dataValues))
		.catch(error => cb(error));
	},

	findOneByClientname(clientname,cb) {
		FaxLog.findOne({where: {clientname: clientname}})
		.then(faxlog => cb(null,faxlog.dataValues))
		.catch(error => cb(error));
	},

	//for this function, make sure you pass the syntax of the where statement that you want to use. Follow https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
	findAllByStatement(statement,cb) {
		FaxLogs.findAll(statement)
		.then(faxlog => cb(null,faxlog))
		.catch(error => cb(error));
	},

	updateRecordByWhereStatement(whereStatement,updateDetails,cb) {
		FaxLogs.update(updateDetails,{where: whereStatement})
		.then(faxlog => cb(null,faxlog))
		.catch(error => cb(error));
	}
};


