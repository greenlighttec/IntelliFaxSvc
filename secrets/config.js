module.exports =  {
"telnyx": {
	"telnyxapikey": process.env.TELNYX_API_SECRETKEY,
	"telnyxpublickey": process.env.TELNYX_API_PUBLICKEY,
	"telnyxappid": process.env.TELNYX_FAXAPP_ID
	},
"database": {
  "development": {
    "host":  process.env.DEV_DB_HOST,
    "port":  process.env.DEV_DB_PORT,
    "username":  process.env.DEV_DB_USER,
    "password":  process.env.DEV_DB_PASS,
    "database":  process.env.DEV_DB_DATABASE,
    "dialect":  process.env.DEV_DB_DIALECT,
    "logging":  process.env.DEV_DB_LOGGING
  },
  "test": {
    "host":  process.env.TEST_DB_HOST,
    "port":  process.env.TEST_DB_PORT,
    "username":  process.env.TEST_DB_USER,
    "password":  process.env.TEST_DB_PASS,
    "database":  process.env.TEST_DB_DATABASE,
    "dialect": process.env.TEST_DB_DIALECT,
    "logging": process.env.TEST_DB_LOGGING
  },
  "production": {
    "host": process.env.PROD_DB_HOST,
    "port": process.env.PROD_DB_PORT,
    "username": process.env.PROD_DB_USER,
    "password": process.env.PROD_DB_PASS,
    "database": process.env.PROD_DB_DATABASE,
    "dialect": process.env.PROD_DB_DIALECT,
    "logging": process.env.PROD_DB_LOGGING
  }
},
 "internals": {
        "baseHostname": process.env.FAXAPP_DOMAIN, //Change this to the public hostname of this application
        "basePath": "/home/node/faxapp/", //Set this to the root path where this application is sitting
        "faxAtaServerUrl": process.env.FAXBACK_FAXATAURL, //Set this to the faxAtaServerUrl provided by FaxBack
        "telnyxSendFaxUrl": process.env.TELNYX_API_URL //Set this to the Telnyx API
        }
}
