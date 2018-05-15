import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Data = new Mongo.Collection('data');

const dataSchema = new SimpleSchema({
  updated: {
    type: Date,
  },
  seller: {
    type: String,
    optional: true,
  },
  buyer: {
    type: String,
    optional: true,
  },
});

if (Meteor.isServer) {
  Meteor.publish('data', function tasksPublication() {
    return Data.find({}, { sort: { $natural: -1 }, limit: 1 });
  });
}


Data.attachSchema(dataSchema);

export default Data;
export { dataSchema };
