const tools = require('../tools.js');
const request = tools.request;
const fs = tools.fs;
const faxAtaServerUrl = tools.faxAtaServerUrl;
const ProviderGuid = '49A5BF1C-16AE-49CF-80CC-4150CC9C2018';
const dbCommands = ('../databaseCommands');

var deliverImage = function (pdfFile,callingNumber,calledNumber) {

 var accountId = dbCommands.lookupAccountIdByFaxNo(callingNumber), messageType = '1';

 var options = { method: 'POST',
   url: faxAtaServerUrl,
   qs: { target: 'atamime' },
   headers:
    { 'cache-control': 'no-cache',
      'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
   formData:
    { ServiceName: 'ConnectorService',
      Function: 'DeliverImage',
      AccountId: accountId,
      PhoneNumber: calledNumber,
      MessageType: messageType,
      CallingNumber: callingNumber,
      CallingStationId: callingNumber,
      ProviderGuid: ProviderGuid,
      FaxImage:
        { value: fs.createReadStream(pdfFile),
          options: { filename: 'faximage.tif', contentType: null } } } };

 request(options, function (error, response, body) {
   if (error) throw new Error(error);

   console.log(body);
 });

}

module.exports = deliverImage
