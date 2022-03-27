const convertImage = require('/root/webapps/intellifaxsvc/lib/convertPdf2Tiff.js');
const fs = require('fs');
const mp = require('tiff-multipage');
const request = require("request");


var ReceiveFax = function (req, res, next) {


console.log(req.files, req.body);
next();



/* Send this out to https://rest-api.faxback.com/nsps/nsps.aspx?target=atamime so the ATA prints it out
 var options = { method: 'POST',
   url: 'https://rest-api.faxback.com/nsps/nsps.aspx',
   qs: { target: 'atamime' },
   headers:
    { 'cache-control': 'no-cache',
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
   formData:
    { ServiceName: 'ConnectorService',
      Function: 'DeliverImage',
      AccountId: 'intellicompdemofax',
      PhoneNumber: '16674021037',
      MessageType: '',
      CallingNumber: '7071236',
      CallingStationId: '7071236' } };

 request(options, function (error, response, body) {
   if (error) throw new Error(error);

   console.log(body);
 });

*/
};

module.exports = ReceiveFax
