const tools = require('../tools.js');
const Devices = require(tools.basePath + 'models').Devices;
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
        create(clientid,devicename,macaddr,line1no,line2no,username,password,cb) {
        hashPassword(password,(securePassword) => {

                return Devices
                .create({clientid: clientid,
			 name: devicename,
			 macaddr: macaddr,
			 line1: line1no,
			 line2: line2no,
			 username: username,
			 password: securePassword
			})
                .then(device => cb(null,device.dataValues))
                .catch(error => cb(error));
        })},

        findByPk(id,cb) {
                Devices.findByPk(id)
                .then(device => cb(null,device.dataValues))
                .catch(error => cb(error));
        },

        findOneByDevicename(Devicename,cb) {
                Devices.findOne({where: {name: Devicename}})
                .then(device => cb(null,device.dataValues))
                .catch(error => cb(error));
        },

        //for this function, make sure you pass the syntax of the where statement that you want to use. Follow https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
        findAllByStatement(statement,cb) {
                Devices.findAll(statement)
                .then(device => cb(null,device))
                .catch(error => cb(error));
        }
};
