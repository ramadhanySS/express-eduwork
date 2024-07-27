const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload' });
const Product = require('./model');
const path = require('path');
const fs = require('fs');
const { error } = require('console');
const mongoose = require('mongoose');

router.get('/product', (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

router.get('/product/:id', (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'ID tidak valid' });
  }
  Product.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ error: 'Data tidak ditemukan' });
      }
      res.send(result);
    })
    .catch((error) => res.status(500).send(error));
});

router.post('/product', upload.single('image'), (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;

  console.log('Received data:', { name, price, stock, status, image });

  if (image) {
    const target = path.join(__dirname, '../../upload', image.originalname);
    fs.renameSync(image.path, target);
    Product.create({
      name,
      price,
      stock,
      status,
      image_url: `http://localhost:3000/public/${image.originalname}`,
    })
      .then((result) => {
        console.log('Product saved:', result);
        res.send(result);
      })
      .catch((error) => {
        console.error('Error saving product:', error);
        res.status(500).send(error);
      });
  }
});
router.put('/product/:id', upload.single('image'), async (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'ID tidak valid' });
  }

  let updateData = { name, price, stock, status };

  try {
    if (image) {
      const target = path.join(__dirname, '../../upload', image.originalname);
      fs.renameSync(image.path, target);
      updateData.image_url = `http://localhost:3000/public/${image.originalname}`;
    }

    const result = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!result) {
      return res.status(404).send({ error: 'Data tidak ditemukan' });
    }

    res.send(result);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send(error);
  }
});

router.delete('/product/:id', (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({ error: 'Data tidak ditemukan' });
      }
      res.send({ message: 'Product deleted successfully' });
    })
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
