const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "field name harus ada"],
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: [true, 'Harga produk harus diisi'],
    min: 1000,
    max: 100000000,
  },
  stock:{ 
    type: Number,
    required: [true, 'Stok produk harus diisi'],
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, 'Status produk harus diisi'],
  },
  image_url: {
    type: String,
    required: false,
  },
});

productSchema.plugin(AutoIncrement, {inc_field: 'id'});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
