# IntelliFaxSvc
Middleware for AudioCode Fax Services v0.0.01a

## XML File Creation
You'll need to create an XML file that consists of the configuration you want the gateway to have. A generic XML file exists called "general.xml" in the public folder. You can copy this and make a separate one for each device.

## Secret Folder
You'll need to create the secrets folder with a database.json file with. Alternatively replace this with database queries and move to a database backend

### database.json example
```{
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

}```


### Required external applications
* poppler-utils
* libtiff-utils
