// Used for account lookup and provisioning of fax appliances
const fs = require('fs');
const path = require('path');

var jsonPath = path.join(__dirname, '../public/general.xml');

const buffer = fs.readFileSync(jsonPath);
const generalxml = buffer.toString()

console.log(generalxml);
/*

                if (deviceMac) {
                        console.log('Provisioning request for MAC ' + deviceMac)
                        res.contentType('application/xml');
                        res.sendFile(path.join(__dirname , '/public/' + deviceMac + '.xml' ));
                }
                else {
                        var answer = tools.multiply(a,b);
                        var httpresponse = `<h1>${paths[0]}</h1><p>Hooray you made it, your answer is ${answer}</p>`;
                        res.send(httpresponse)

                }
*/
