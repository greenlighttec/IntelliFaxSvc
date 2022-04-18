const tools = require('../tools.js');
const Users = require(tools.basePath + 'models').Users;
const bcrypt = require('bcrypt');

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

module.exports = {
        create(clientid,firstname,lastname,username,password,cb) {
        hashPassword(password,(securePassword) => {

                return Users
                .create({clientid: clientid,
			 firstname: firstname,
			 lastname: lastname,
			 username: username,
			 password: securePassword
			})
                .then(user => cb(user.dataValues))
                .catch(error => console.log(error));
        })},

        findByPk(id,cb) {
                Users.findByPk(id)
                .then(user => cb(user.dataValues))
                .catch(error => console.log(error));
        },

        findOneByUsername(username,cb) {
                Users.findOne({where: {username: username}})
                .then(client => cb(Users.dataValues))
                .catch(error => console.log(error));
        },

        //for this function, make sure you pass the syntax of the where statement that you want to use. Follow https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
        findAllByStatement(statement,cb) {
                Users.findAll(statement)
                .then(user => cb(user))
                .catch(error => console.log(error));
        },

        updateRecordByWhereStatement(whereStatement,updateDetails,cb) {
                Users.update(updateDetails,{where: whereStatement})
                .then(user => cb(user))
                .catch(error => console.log(error));
        },

	deleteUserByWhereStatement(whereStatement,cb) {
		Users.destroy(whereStatement)
		.then(user => cb(user))
		.catch(error => console.log(error));
	}


};
