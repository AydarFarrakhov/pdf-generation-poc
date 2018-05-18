import Data from './index';
import { fillPDF } from '../pdfService';

if (Meteor.isServer) {
  Meteor.publish('data', function tasksPublication() {
    return Data.find({}, { sort: { $natural: -1 }});
  });

  Data.before.insert(function(userId, doc) {
    doc.pdfName = generateDestinationFileName();
    doc.processing = true;
  });

  Data.after.insert(function (userId, doc) {
    handlePDFChange(doc, this._id)
  });

  Data.before.update(function(userId, doc, fieldNames, modifier) {
    modifier.$set = modifier.$set || {};
    modifier.$set.processing = true;
  });

  Data.after.update(function(userId, doc) {
    handlePDFChange(doc, doc._id)
  });
}

function generateDestinationFileName() {
  const randomSequence = Math.random().toString(36).substring(7);
  const currentTime = new Date().getTime();
  return currentTime + randomSequence + ".pdf";
}

function handlePDFChange(doc, id) {
  console.log('Handle document change or insert');
  fillPDF({ ...doc }, doc.pdfName)
    .then(() => {
      Data.direct.update({ _id: id }, { $set: { processing: false } }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
}
