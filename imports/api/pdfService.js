const fs = Npm.require('fs');
const sourcePDF = Assets.absoluteFilePath('PDFFormWithFields.pdf');

const child_process = Npm.require('child_process');
const exec = child_process.exec;
const fdf = Npm.require('utf8-fdf-generator');

function fillFormWithFlatten(sourceFile, fieldValues, shouldFlatten, callback) {

  const randomSequence = Math.random().toString(36).substring(7);
  const currentTime = new Date().getTime();
  const tempFDF = "temp_data" + currentTime + randomSequence + ".fdf";
  const destinationFile =  currentTime + randomSequence + ".pdf";
  fdf.generator(fieldValues, tempFDF);

  const command = `pdftk ${sourceFile} fill_form ${tempFDF} output ${destinationFile} flatten`;
  exec(command, {}, function (error) {
    if (error) {
      console.log('exec error: ' + error);
      return callback(error);
    }
    fs.unlink(tempFDF, function (err) {
      if (err) {
        return callback(err);
      }
      return callback(undefined, destinationFile);
    });
  });
}

export function fillPDF(data, callback) {
  const dataWithError = Object.keys(data).reduce((obj, k) => {
    let value = data[ k ];
    if (!value || value.length === 0) {
      value = 'needs data';
    }
    return {
      ...obj,
      [ k ]: value,
    };
  }, {});

  fillFormWithFlatten(sourcePDF, dataWithError, false, function (err, file) {
    if (err) {
      console.log(err);
      callback(err);
    }
    console.log("PDF is saved");
    console.log(file);
    callback(undefined, file);
  });
}
