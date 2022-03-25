# IntelliFaxSvc
Middleware for AudioCode Fax Services v0.0.01a

## XML File Creation
You'll need to create an XML file that consists of the configuration you want the gateway to have. A generic XML file exists called "general.xml" in the public folder. You can copy this and make a separate one for each device.

## Secret Folder
You'll need to create the secrets folder with the devicemapping.json and creds.json files with json objects. Alternatively replace this with database queries and move to a database backend

### creds.json example
{"username": "password"}

### devicemapping.json example
{"username": "devicemacaddress"}

### Required external applications
* poppler-utils
* libtiff-utils
