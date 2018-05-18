import { Meteor } from 'meteor/meteor';

import Data from '../../api/data';
import { insertData } from '../../api/data/dataMethods';

const sampleData = {
  name: 'Sample data',
  shipperName: 'Valero Marketing and Supply Company',
  shipperAddress: 'One Valero Wat San Antonio, TX 000000--0000',
  date: 'February 4, 2018',
  booking: '0000000',
  contactNumber: '0000000',
  countryOfOrigin: 'Linden, In',
  portOfExport: 'Savannah, GA',
  destinationPort: 'Ho Chi Ming City, Vietnam',
  vessel: 'OOCL France 0008W',
  consigneeName: 'VIMAG Commodities CO., LTD 15 D1, DAI',
  consigneeAddress: 'KIM NEW URBAN AREA, HOANG MAI DIST HA NOI, VIETNAM +844.0000000',
  descriptionOfGoods: 'Distillers Dried with Solubles (DDGS)',
  tons: 364.223,
  packingList: [
    {
      container: 'HM000000001',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
    {
      container: 'HM000000002',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
    {
      container: 'HM0000000003',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
    {
      container: 'HM0000000004',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
    {
      container: 'HM000000005',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
    {
      container: 'HM000000006',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
    {
      container: 'HM000000007',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
    {
      container: 'HM000000008',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
    {
      container: 'HM000000009',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
    {
      container: 'HM000000010',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
    {
      container: 'HM000000011',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
    {
      container: 'HM000000012',
      seal: '023211',
      netLb: 57.9,
      netKg: 26.071,
    },
  ],
  signatureName: 'Brandy Dunlap',
  signatureTitle: 'Scheduler Renewables Logistics'
};

const withoutFields = {
  ...sampleData,
  name: 'Sample data with errors',
  packingList: [],
  signatureName: '',
};

Meteor.startup(() => {
  if (Data.find().count() === 0) {
    console.log('Zero');
    insertData(sampleData);
    insertData(withoutFields);
  }
});
