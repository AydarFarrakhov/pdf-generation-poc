const fs = Npm.require('fs');

import Data from './data';
import { fillPDF } from './pdfService';

Meteor.methods({
  'data.insert'(data) {
    Data.insert({
      ...data,
      updated: new Date(),
    });
    return new Promise((resolve) => {
      fillPDF(data, (err, result) => resolve(result));
    })
  },
});

WebApp.connectHandlers.use('/pdf/', (req, res) => {
  const parts = req.url.split("/");
  const fn = parts[1];
  console.log(fn);
  let data;
  try {
    data = fs.readFileSync(fn);
  } catch (err) {
    console.log(err);
    res.writeHead(404);
    res.end('Error 404 - Not found.');
    return;
  }

  const headers = {
    'Content-type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=' + fn
  };
  res.writeHead(200, headers);
  res.end(data);
});
