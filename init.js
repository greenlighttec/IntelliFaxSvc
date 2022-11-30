var models = require(process.env.WORKDIR + 'models')
models.sequelize.sync()
const Clients = require(process.env.WORKDIR + 'models').Clients;
const users = require(process.env.WORKDIR + 'lib/admin/UserAccounts.js');

Clients.create({id: 1,clientname: 'Default Site'})

/* Users.create({
    firstname: 'Default',
    lastname: 'Admin',
    username: 'admin',
    password: 'admin',
    clientid: -1
}) */

users.create(1, 'Default', 'Admin', 'Admin', 'Admin', user => console.log(user))
