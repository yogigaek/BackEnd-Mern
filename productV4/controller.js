const path = require(`path`);
const fs = require(`fs`);
const Product = require(`./model`);
const { ObjectId } = require("bson");

const getProduct =  (req, res ) => {
    Product.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const getProductById = async (req, res) => {
    const id = req.params;
    try {
      const productid = await Product.findById({ _id: ObjectId(id) });
      res.send(productid);
    } catch (error) {
      res.send(error);
    }
};

const createProduct = (req, res) => {
    const {
        name,
        stock,
        price,
        status
    } = req.body;
        Product.create({
                name,
                stock,
                price,
                status
            })
            .then((result) => res.send(result))
            .catch((error) => res.send(error));
};

const searchProduct = async (req, res) => {
    try {
      const regex = new RegExp(req.params.search, 'i') 
      const product = await Product.find({ name: regex  });
      res.send(product);
    } catch (error) {
      res.send(error);
      console.log(error);
    }
};

const updateProduct = (req, res) => {
    const id = req.params;
    const update = req.body;
  
    Product.updateOne({ _id: ObjectId(id) }, { $set: update })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
};

const deleteProduct = async (req, res) => {
    const id = req.params;
    Product.deleteOne({ _id: ObjectId(id) })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
};


module.exports = {
    createProduct,
    getProduct,
    getProductById,
    searchProduct,
    updateProduct,
    deleteProduct
}
