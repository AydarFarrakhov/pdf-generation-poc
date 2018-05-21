import { packingListData } from './data/packingList';
import { billOfLading } from './data/billOfLading';
import { certificateOfOrigin } from './data/certificateOfOrigin';

const pdf = require('html-pdf');
const pug = require('pug');

const dataMapping = {
  packingList: packingListData,
  billOfLading: billOfLading,
  certificateOfOrigin: certificateOfOrigin,
};

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

WebApp.connectHandlers.use('/pdf/', (req, res) => {
  const parts = req.url.split("/");
  const templateName = parts[1];
  const data = dataMapping[templateName];
  if (!data || !templateName) {
    sendError(res, 'Template or data not found');
    return;
  }
  console.log(`Render template ${templateName}`);
  const html = pug.renderFile(Assets.absoluteFilePath(`${templateName}.pug`), data);
  pdf.create(html, options).toStream(async function(err, stream){
    if (err) {
      sendError(res, err);
      return;
    }
    const headers = {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${templateName}.pdf`
    };
    res.writeHead(200, headers);
    stream.pipe(res);
  });
});

WebApp.connectHandlers.use('/html/', (req, res) => {
  const parts = req.url.split("/");
  const templateName = parts[1];
  const data = dataMapping[templateName];
  if (!data || !templateName) {
    sendError(res, 'Template or data not found');
    return;
  }
  console.log(`Render template ${templateName}`);
  const html = pug.renderFile(Assets.absoluteFilePath(`${templateName}.pug`), data);
  res.write(html);
  res.end();
});

function sendError(res, err) {
  if (err) {
    console.log(err);
  }
  res.writeHead(404);
  res.end('Error 404 - Not found.');
}
