# IntelliFaxSvc
Middleware for AudioCode Fax Services v0.0.02

## XML File Creation
You'll need to create an XML file that consists of the configuration you want the gateway to have. A generic XML file exists called "general.xml" in the public folder. You can copy this and make a separate one for each device.

The files should be created with the mac address of the device.
## Required Support folders
The database.json file has been moved to a backend MySQL database powered by Sequelize. You'll need to create a "config" folder with "config.json" file.

An example file exists which will need to be copied to "config.json" and then modify the relevant parts for the database connection.

 **note that initially all lookups occur out of './lib/databaseCommands.js' and the replacement of json backend to database backend was mostly completed here** Some additional database commands are occurring in the admin API.

You'll also need to create an 'uploaded_files' folder, and inside that create two folders 'pdfs' and 'tiffs'. This is where faxes will temporarily be stored as they're exchanged.


*Note that end goal is for faxes to not be retained long term and are deleted immediately after transmission. Right now deletion after transmission does not happen.*

## Telnyx API

The commands for the Telnyx API are built into the application, you'll need to create a secrets.json with the API Key there. 

 - Install this project, and connect it to a MySQL database
 - using Node, use "const users = require('./lib/admin/UserAccounts.js') to import the Users database commands
 - inside the Node console run "users.create(clientid, firstanme, lastname, username, password, user => console.log(user))"
 - Set ClientID to 0, and use the details set in the above command to login to the Admin front end (/admin). Note this application only supports HTTP currently so place it behind a reverse proxy
 - Create a Telnyx fax application, and set the Webhook response to the root URL of this application.
 - Assign an outbound profile, and numbers to your fax application to start using it
 - Add your AudioCode devices to your clients using the Admin UI making sure to set the phone numbers to E+164 format (e.g. +1)
 - Make sure your FaxBack server is set to the same URL as the Telnyx webhooks, and modify the secrets file to match the details that FaxBack tells you to use.

### Required external applications
* poppler-utils
* libtiff-utils
* libTIFF - See https://library.knightlab.com/technical-learning-resources/ubuntu-how-tos/adding-libtiff-to-ubuntu
	* pkgconf
	* gyp


