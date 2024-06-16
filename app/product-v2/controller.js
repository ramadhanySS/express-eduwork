const Product = require("./model");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

const store = async (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../upload", image.originalname);
    fs.renameSync(image.path, target);
  }
  try {
    await Product.sync();
    const result = await Product.create({
      user_id,
      name,
      price,
      stock,
      status,
      image_url: `http://localhost:3000/public/${image.originalname}`,
    });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

const view = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.send(product);
  } catch (e) {
    res.send(e);
  }
};
const viewId = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.send({ error: "Product not found" });
    }
  } catch (e) {
    res.send(e);
  }
};

const viewName = async (req, res) => {
  const { name } = req.query;
  try {
    const nameProduct = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    if (nameProduct.length > 0) {
      res.send(nameProduct);
    } else {
      res.send({ error: "Product tidak ditemukan" });
    }
  } catch (e) {
    res.send(e);
  }
};

const destroy = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.send({ message: "product Deleted" });
    } else {
      res.send({ error: "Product not found" });
    }
  } catch (e) {
    res.send(e);
  }
};

const update = async (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;
  let image_url;
  if (image) {
    const target = path.join(__dirname, "../../upload", image.originalname);
    fs.renameSync(image.path, target);
    image_url = `http://localhost:3000/public/${image.originalname}`;
  }
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      product.user_id = user_id;
      product.name = name;
      product.price = price;
      product.stock = stock;
      product.status = status;
      if (image_url) {
        product.image_url = image_url;
      }
      await product.save();
      res.send(product);
    } else {
      res.send({ error: "Product not found" });
    }
  } catch (e) {
    res.send(e);
  }
};

module.exports = { store, view, viewName, destroy, update, viewId };
