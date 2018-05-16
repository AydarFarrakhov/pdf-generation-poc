const db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
const GridStore = MongoInternals.NpmModule.GridStore;

export function storeFile(file) {
  return new Promise((resolve, reject) => {
    const gs = new GridStore(db, file, 'w');
    gs.open((err, gs) => {
      gs.writeFile(file, (err) => {
        if (err) {
          reject(err);
        }
        resolve(file);
      });
    });
  });
}


export function getFile(name) {
  return new Promise((resolve, reject) => {
    GridStore.exist(db, name, (err, isExist) => {
      if (!isExist) {
        console.log("reject");
        reject("File not found");
        return;
      }
      readFile(name, resolve, reject);
    });
  });
}

function readFile(name, resolve, reject) {
  const gs = new GridStore(db, name, 'r');
  gs.open((err, gs) => {
    if (err) {
      reject("Error while opening file");
      return;
    }
    resolve(gs);
  });
}

