const { ObjectId } = require("bson");
const db = require(`../config/mongodb`);
const path = require(`path`);
const fs = require(`fs`);

const index = (req, res) => {
    db.collection(`products`).find()
        .toArray()
        .then(result => res.send(result))
        .catch(error => res.send(error));
};

const view = (req, res) => {
    const {
        id
    } = req.params;
    db.collection(`products`).findOne({
            _id: ObjectId(id)
        })
        .then(result => res.send(result))
        .catch(error => res.send(error));
};

const store = (req, res) => {
    const {
        name,
        stock,
        price,
        status
    } = req.body;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, "../uploads", image.originalname);
        fs.renameSync(image.path, target);
        db.collection(`products`)
            .insertOne({
                name,
                stock,
                price,
                status,
                image_url: `http://localhost:3000/public/${image.originalname}`,
            })
            .then((result) => res.send(result))
            .catch((error) => res.send(error));
    }
};

const update = (req, res) => {
    const update = req.body;
    const image = req.file;
    const id = req.params;
    if (image) {
        const target = path.join(__dirname, "../uploads", image.originalname);
        fs.renameSync(image.path, target);
        db.collection(`products`)
            .updateOne({
                _id: ObjectId(id)
            }, {
                $set: update,
            })
            .then((result) => res.send(result))
            .catch((error) => console.log(error));
    }
};

const deleteProduct = (req, res) => {
    const id = req.params.id;
    db.collection(`products`)
        .deleteOne({
            _id: ObjectId(id)
        })
        .then((result) => res.send(result))
        .catch((error) => res.send(error));
};

module.exports = {
    index,
    view,
    store,
    update,
    deleteProduct
}