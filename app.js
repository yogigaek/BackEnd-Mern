require(`./config/mongoose`);
const express = require(`express`);
const app = express();
const path = require(`path`);
const cors = require(`cors`);
const logger = require(`morgan`);
const productRouterV3 = require(`./productV3/routes`);
const productRouterV4 = require(`./productV4/routes`); 
const bodyParser = require(`body-parser`);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(`/api/v3`, productRouterV3);
app.use(`/api/v4`, productRouterV4);
app.use(logger(`dev`));

app.use('/public', express.static(path.join(__dirname, 'uploads'))); 
app.use(`/`, (req, res, next) => {
    res.status(404)
    // use tag html
    res.send(`<h1> Page not found </h1>`); 
});

if(process.env.NODE_ENV === `production`) {
    app.use(express.static('FrontEnd-Mern/build'));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, 'FrontEnd-Mern', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));