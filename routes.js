const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "upload" });
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
  res.send({
    status: "Succesfully",
    message: "Welcome to Express Js",
  });
});

router.get("/product/:id", (req, res) => {
  res.json({
    id: req.params.id,
  });
});

router.post("/product/", upload.single("image"), (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "upload", image.originalname);
    fs.renameSync(image.path, target);
  }
    res.json({
      name,
      price,
      stock,
      status,
      image,
    });
//   res.sendFile(target);
});

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
