import { storeFile } from './filesService';

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

function fillFormWithData(sourceFile, data, destinationFile) {
  return new Promise((resolve, reject) => {
    const html = pug.renderFile(sourceFile, data);
    pdf.create(html, options).toStream(async function(err, stream){
      const location = await storeFile(destinationFile, stream);
      console.log('resolve');
      resolve(location);
    });
  });
}

export function fillPDF(data, destinationName) {
  return fillFormWithData(template, data, destinationName);
}
