const admin = require("firebase-admin");
const serviceAccount = require(`../${process.env.ENV == "dev" ? process.env.JSON_FB_URI : process.env.TEST_JSON_FB_URI}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;