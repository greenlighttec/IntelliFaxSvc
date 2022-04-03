// shared common modules and variables
const TelnyxAPIKey = 'blahblahkey'; //Insert Telnyx API Key Here
const basePath = '/root/webapps/intellifaxsvc/' //Set this variable to the base path of the fax application.
const telnyx = require('telnyx')(TelnyxAPIKey);
const fs = require('fs');
const path = require('path');
const faxAtaServerUrl = 'https://rest-api.faxback.com/nsps/nsps.aspx';
const request = require('request');

module.exports = {

 fs: fs,
 path: path,
 TelnyxAPIKey: TelnyxAPIKey,
 basePath: basePath,
 telnyx: telnyx,
 request: request

}




