# IntelliFaxSvc
Middleware for AudioCode Fax Services v0.0.02

## XML File Creation
You'll need to create an XML file that consists of the configuration you want the gateway to have. A generic XML file exists called "general.xml" in the public folder. You can copy this and make a separate one for each device.

## Required Support folders
You'll need to create the secrets folder with a database.json file with. Alternatively replace this with database queries and move to a database backend, and then modify the code.
 **note that right now all lookups occur out of './lib/databaseCommands.js' and the replacement of json backend to database backend should happen there**

You'll also need to create an 'uploaded_files' folder, and inside that create two folders 'pdfs' and 'tiffs'. This is where faxes will temporarily be stored as they're exchanged.


*Note that end goal is for faxes to not be retained long term and are deleted immediately after transmission. Right now deletion after transmission does not happen.*

### database.json example
```
{
        "username": {
                "password": "password",
                "devicemap": "macaddr1",
                "faxnumber1": "+12015554678",
		"faxcallerid1": "Caller ID 1",
		"faxnumber2": "+12015554679",
		"faxcallerid2": "Caller ID 2"
        },
        "testuserblah": {
                "password": "supersecret",
                "devicemap": "macaddr2",
                "faxnumber1": "+12015554680",
		"faxcallerid1": "Caller ID 1",
                "faxnumber2": "+12015554681",
		"faxcallerid2": "Caller ID 2"

        }

}
```


### Required external applications
* poppler-utils
* libtiff-utils
* libTIFF - See https://library.knightlab.com/technical-learning-resources/ubuntu-how-tos/adding-libtiff-to-ubuntu
	* pkgconf
	* gyp
