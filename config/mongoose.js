const mongoose = require(`mongoose`);

mongoose.connect(`mongodb+srv://yogi-admin:eduwork@cluster0.otzzu.mongodb.net/eduwork-mongoose?retryWrites=true&w=majority`);

const db = mongoose.connection;
db.on(`error`, console.error.bind(console, `connection error: `));
db.once(`open`, () => console.log(`server database terhubung`)); 

