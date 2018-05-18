import { storeFile } from './gridService';

const fs = Npm.require('fs');
const pdf = require('html-pdf');
const pug = require('pug');

const template = Assets.absoluteFilePath('template.pug');

const options = {
  format: 'A4',
  height: '29.7cm',
  width: '21cm',
  type: 'pdf',
  border: {
    "top": "1cm",
    "right": "1cm",
    "bottom": "1cm",
    "left": "1cm",
  },
};

function fillFormWithData(sourceFile, data) {


  return new Promise((resolve, reject) => {
    const randomSequence = Math.random().toString(36).substring(7);
    const currentTime = new Date().getTime();
    const destinationFile = currentTime + randomSequence + ".pdf";

    const html = pug.renderFile(sourceFile, data);
    pdf.create(html, options).toStream(function(err, stream){
      stream.pipe(fs.createWriteStream(destinationFile));
      storeFile(destinationFile)
        .then(f => removeTempFile(f));
      resolve(destinationFile);
    });
  });
}

function removeTempFile(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) reject(err);
      resolve(file);
    });
  });
}


export function fillPDF(data) {
  return fillFormWithData(template, data);
}
