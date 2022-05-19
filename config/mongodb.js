const { MongoClient } = require(`mongodb`);

const url = `mongodb://yogi:eduwork@localhost:27017?authSource=admin`;
const client = new MongoClient(url);

(async ()=> {
    try {
        await client.connect();
        console.log(`connect to mongoDB success`);
    } catch (e) {
        console.log(e);
    }
})();

const db = client.db(`eduwork-native`);

module.exports = db;