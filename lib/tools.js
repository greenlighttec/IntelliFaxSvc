// shared common modules
const fs = require('fs');
const path = require('path');
const dbfile = path.join(__dirname, '../secrets/database.json');
const database = require(dbfile);


module.exports = {

 fs: fs,
 path: path,
 database: database

}




