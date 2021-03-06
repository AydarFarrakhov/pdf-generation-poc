import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Data = new Mongo.Collection('data');

const packingSchema = new SimpleSchema({
  container: String,
  seal: String,
  netLb: Number,
  netKg: Number,
});

const dataSchema = new SimpleSchema({
  name: {
    type: String,
  },
  pdfName: {
    type: String,
    optional: true,
  },
  processing: {
    type: Boolean,
    optional: true,
  },
  shipperName: {
    type: String,
    optional: true,
  },
  shipperAddress: {
    type: String,
    optional: true,
  },
  date: {
    type: String,
    optional: true,
  },
  booking: {
    type: String,
    optional: true,
  },
  contactNumber: {
    type: String,
    optional: true,
  },
  countryOfOrigin: {
    type: String,
    optional: true,
  },
  portOfExport: {
    type: String,
    optional: true,
  },
  destinationPort: {
    type: String,
    optional: true,
  },
  vessel: {
    type: String,
    optional: true,
  },
  consigneeName: {
    type: String,
    optional: true,
  },
  consigneeAddress: {
    type: String,
    optional: true,
  },
  descriptionOfGoods: {
    type: String,
    optional: true,
  },
  tons: {
    type: Number,
    optional: true,
  },
  packingList: {
    type: Array,
    optional: true,
  },
  'packingList.$': {
    type: packingSchema,
  },
  signatureName: {
    type: String,
    optional: true,
  },
  signatureTitle: {
    type: String,
    optional: true,
  },
});


Data.attachSchema(dataSchema);

export default Data;
export { dataSchema };
