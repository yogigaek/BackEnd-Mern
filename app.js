require(`./config/mongoose`);
const express = require(`express`);
const app = express();
const path = require(`path`);
const getCors = require(`cors`);
const cors = getCors();
const logger = require(`morgan`);
const productRouterV3 = require(`./productV3/routes`);
const productRouterV4 = require(`./productV4/routes`); 

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors);
app.use(`/api/v3`, productRouterV3);
app.use(`/api/v4`, productRouterV4);
app.use(logger(`dev`));

app.use('/public', express.static(path.join(__dirname, 'uploads'))); 
app.use(`/`, (req, res, next) => {
    res.status(404)
    // use tag html
    res.send(`<h1> Page not found </h1>`); 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));