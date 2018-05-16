import { getFile } from './gridService';

import Data from './data';
import { fillPDF } from './pdfService';

Meteor.methods({
  'data.insert'(data) {
    return fillPDF(data).then(pdfName => {
      const fullData = {
        ...data,
        pdfName,
      };
      if (!data._id) {
        Data.insert(fullData);
      } else {
        Data.update({_id: data._id }, { $set: fullData });
      }
      return fullData;
    });
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
    console.log(err);
    res.writeHead(404);
    res.end('Error 404 - Not found.');
  });
});
