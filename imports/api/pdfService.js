import { storeFile } from './gridService';

const fs = Npm.require('fs');
const hummus = require('hummus');
import fillForm from './lib/pdf-form-fill';

const sourcePDF = Assets.absoluteFilePath('PDFFormWithFields.pdf');

function fillFormWithFlatten(sourceFile, fieldValues) {

  const randomSequence = Math.random().toString(36).substring(7);
  const currentTime = new Date().getTime();
  const destinationFile = currentTime + randomSequence + ".pdf";
  const writer = hummus.createWriterToModify(sourceFile, { modifiedFilePath: destinationFile });

  fillForm(writer, fieldValues);
  writer.end();
  return storeFile(destinationFile)
    .then(f => removeTempFile(f));
}

function removeTempFile(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) reject(err);
      resolve(file);
    });
  });
}

function fillWithNeedsData(data) {
  return Object.keys(data).reduce((obj, k) => {
    let value = data[ k ];
    if (value === '' || value === undefined || value === null) {
      value = 'needs data';
    } else {
      value = value.toString();
    }
    return {
      ...obj,
      [ k ]: value,
    };
  }, {});

}

export function fillPDF(data) {
  const dataWithErrors = fillWithNeedsData(data);

  return fillFormWithFlatten(sourcePDF, dataWithErrors);
}
