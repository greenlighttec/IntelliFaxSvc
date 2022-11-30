var models = require(process.env.WORKDIR + 'models')
models.sequelize.sync()
const Clients = require(process.env.WORKDIR + 'models').Clients;
const users = require(process.env.WORKDIR + 'lib/admin/UserAccounts.js');

Clients.create({id: 1,clientname: process.env.ADMIN_COMPANY})
users.create(1, 'Default', 'Admin', process.env.ADMIN_USER, process.env.ADMIN_PASS, user => console.log(user))
