const router = require("express").Router();
const productController = require("./controller");
const multer = require("multer");
const upload = multer({ dest: "upload" });

router.get("/product", productController.view);
router.get('/product/:id', productController.viewId)
router.get("/product-by", productController.viewName);
router.post("/product", upload.single("image"), productController.store);
router.put("/product/:id", upload.single("image"), productController.update);
router.delete("/product/:id", productController.destroy);

module.exports = router;
