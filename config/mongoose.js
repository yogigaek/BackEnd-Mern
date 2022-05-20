const mongoose = require(`mongoose`);

const mongoURI =
`mongodb+srv://yogi-admin:eduwork@cluster0.otzzu.mongodb.net/eduwork-mongoose?retryWrites=true&w=majority`;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line
    console.log("Database Connection Established...!");
  })
  .catch((err) => {
    // eslint-disable-next-line
    console.log("Error: Database connection can not be established...!", err);
  });

