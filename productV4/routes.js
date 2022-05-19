const router = require(`express`).Router();
const multer = require(`multer`);
const upload = multer({dest: `uploads`});
const productController = require(`./controller`);

router.get(`/product`, productController.getProduct);
router.get(`/product/:id`, productController.getProductById)
router.get('/product/query/:search', productController.searchProduct);
router.post(`/product`, productController.createProduct);
router.patch(`/product/:id`, productController.updateProduct);
router.delete(`/product/:id`, upload.single(`image`), productController.deleteProduct);


module.exports = router