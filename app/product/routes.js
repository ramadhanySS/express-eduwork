const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "upload" });
const productController = require("./controller");

router.get("/product", productController.index);
router.get("/product/:id", productController.view);
router.post("/product/", upload.single("image"), productController.store);
router.put('/product/:id',upload.single('image'), productController.update);
router.delete('/product/:id', upload.single('image'), productController.destroy)

// router.get("/:category/:tag", (req, res) => {
//   const { category, tag } = req.params;
//   res.json({
//     category: category,
//     tag: tag,
//   });
// });

// app.post('/cover', upload.single('image'), function (req, res, next) {

// })
module.exports = router;
