import { getFile } from './gridService';

import Data from './data';
import { fillPDF } from './pdfService';

function generateDestinationFileName() {
  const randomSequence = Math.random().toString(36).substring(7);
  const currentTime = new Date().getTime();
  return currentTime + randomSequence + ".pdf";
}

function handlePDFChange(doc, id) {
  console.log('Handle change');
  fillPDF({ ...doc }, doc.pdfName)
    .then(() => {
        Data.direct.update({_id: id }, { $set: { processing: false } }, (err) => {
          if (err) {
            console.log(err);
          }
        });
    });
}

if (Meteor.isServer) {
  Meteor.publish('data', function tasksPublication() {
    return Data.find({}, { sort: { $natural: -1 }});
  });

  Data.before.insert(function(userId, doc) {
    const file = generateDestinationFileName();
    doc.pdfName = file;
    doc.processing = true;
  });

  Data.after.insert(function (userId, doc) {
    handlePDFChange(doc, this._id)
  });

  Data.before.update(function(userId, doc) {
    doc.processing = true;
  });

  Data.after.update(function(userId, doc) {
    doc.processing = true;
    handlePDFChange(doc, doc._id)
  });
}

export function insertData(data) {
  return new Promise((resolve) => {
    if (!data._id) {
      Data.insert(data, (err, id) => {
        resolve({ ...data, _id: id });
      });
    } else {
      Data.update({_id: data._id }, { $set: { ...data } }, () => {
        resolve(data);
      });
    }
  });
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
