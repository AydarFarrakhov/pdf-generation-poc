import { getFile } from './gridService';

import Data from './data';
import { fillPDF } from './pdfService';

function getFullData(data, pdfName) {
  return {
    ...data,
    pdfName,
  };
}

function updateDataInDB(data, pdfName) {
  return new Promise((resolve) => {
    const fullData = getFullData(data, pdfName);
    if (!data._id) {
      Data.insert(fullData, (err, data) => {
        resolve({ ...fullData, _id: data });
      });
    } else {
      Data.update({_id: data._id }, { $set: fullData }, () => {
        resolve(fullData);
      });
    }
  });
}

export function insertData(data) {
  return fillPDF(data)
    .then(pdfName => updateDataInDB(data, pdfName));
}

Meteor.methods({
  'data.insert'(data) {
    return insertData(data);
  },
});

WebApp.connectHandlers.use('/pdf/', (req, res) => {
  const parts = req.url.split("/");
  const fn = parts[1];
  getFile(fn).then(data => {
    const headers = {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=' + fn
    };
    res.writeHead(200, headers);
    data.stream(true).pipe(res);
  }).catch((err) => {
    res.writeHead(404);
    res.end('Error 404 - Not found.');
  });
});
