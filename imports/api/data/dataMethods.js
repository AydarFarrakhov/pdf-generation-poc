import Data from './index';

Meteor.methods({
  'data.insert'(data) {
    return insertData(data);
  },
});

function updateDataInDB(data, resolve, reject) {
  Data.update({_id: data._id }, { $set: { ...data } }, (err) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(data);
  });
}

function insertDataToDB(data, resolve, reject) {
  Data.insert(data, (err, id) => {
    if (err) {
      reject(err);
      return;
    }
    resolve({ ...data, _id: id });
  });
}

export function insertData(data) {
  return new Promise((resolve, reject) => {
    if (!data._id) {
      insertDataToDB(data, resolve, reject);
    } else {
      updateDataInDB(data, resolve, reject);
    }
  });
}

