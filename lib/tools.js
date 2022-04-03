// shared common modules and variables
const internals = require('../secrets/internals.json').internals;
const baseHostname = internals.baseHostname;
const basePath = internals.basePath;
const fs = require('fs');
const path = require('path');
const faxAtaServerUrl = internals.faxAtaServerUrl;
const telnyxSendFaxUrl = internals.telnyxSendFaxUrl;
const request = require('request');
const multer = require('multer');

const pdfStorage =  multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, basePath + 'uploaded_files/pdfs');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const tiffStorage =  multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, basePath + 'uploaded_files/tiffs');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const pdfUpload = multer({ storage: pdfStorage }).array('FaxImage')
const tiffUpload = multer({ storage: tiffStorage }).array('FaxImage')

module.exports = {

 fs: fs,
 path: path,
 basePath: basePath,
 baseHostname: baseHostname,
 request: request,
 multer: multer,
 pdfUpload: pdfUpload,
 tiffUpload: tiffUpload,
 telnyxSendFaxUrl: telnyxSendFaxUrl,
 faxAtaServerurl: faxAtaServerUrl
 
}




