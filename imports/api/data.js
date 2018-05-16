import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Data = new Mongo.Collection('data');

const dataSchema = new SimpleSchema({
  pdfName: {
    type: String,
  },
  name: {
    type: String,
  },
  year: {
    type: Number,
    optional: true,
  },
  make: {
    type: String,
    optional: true,
  },
  model: {
    type: String,
    optional: true,
  },
  licensePlateRegistrationNumber: {
    type: Number,
    optional: true,
  },
  VINHIN: {
    type: Number,
    optional: true,
  },
  dateOfSale: {
    type: String,
    optional: true,
  },
  salePrice: {
    type: String,
    optional: true,
  },
  sellerNames: {
    type: String,
    optional: true,
  },
  sellerAddress: {
    type: String,
    optional: true,
  },
  city: {
    type: String,
    optional: true,
  },
  state: {
    type: String,
    optional: true,
  },
  zip: {
    type: String,
    optional: true,
  },
  buyerNames: {
    type: String,
    optional: true,
  },
  buyerAddress: {
    type: String,
    optional: true,
  },
  buyerCity: {
    type: String,
    optional: true,
  },
  buyerState: {
    type: String,
    optional: true,
  },
  buyerZip: {
    type: String,
    optional: true,
  },
});

if (Meteor.isServer) {
  Meteor.publish('data', function tasksPublication() {
    return Data.find({}, { sort: { $natural: -1 }});
  });
}


Data.attachSchema(dataSchema);

export default Data;
export { dataSchema };
