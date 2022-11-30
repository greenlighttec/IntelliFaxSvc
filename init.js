var models = require('./models')
models.sequelize.sync()
const users = require(process.env.WORKDIR + 'lib/admin/UserAccounts.js')
users.create(0, 'Default', 'Admin', 'Admin', 'Admin', user => console.log(user))
