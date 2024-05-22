const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/tokenUtils');

const { handleError } = require('../utils/errorUtils.js');
const Product = require('../model/product.Schema.js');
const User = require('../model/user.Schema');

router
  .get('/getProducts', verifyToken, async (req, res, next) => {
    try {
      var userId = req.decoded.data;
      var user = await User.findById(userId).populate('products');
      res
        .status(200)
        .json({ message: 'Products List', products: user.products });
    } catch (err) {
      next(err);
    }
  })
  .get('/getProduct/:productId', verifyToken, async (req, res, next) => {
    const { productId: id } = req.params;
    try {
      const product = await Product.findById(id);
      console.log(!product, product === null);
      if (!product) {
        next(handleError(404, 'Product not found'));
      }
      res
        .status(200)
        .json({ message: 'Product has been fetched', product: product });
    } catch (error) {
      next(error);
    }
  })
  .get('/getProductImages/:productId', verifyToken, async (req, res, next) => {
    const { productId: id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product || product === null) {
        next(handleError(404, 'Product not found'));
      }
      res.status(200).json({
        message: 'All Images for the product ',
        productImages: product?.uploadedImages,
      });
    } catch (error) {
      next(error);
    }
  })
  .post('/createProduct', verifyToken, async (req, res, next) => {
    try {
      var userId = req.decoded.data;
      var user = await User.findById(userId);
      const product = await Product.create(req.body);
      var productsIds = user.products;
      var newProductIds = [];
      if (productsIds.length > 0) {
        newProductIds = [...productsIds, product._id];
      } else {
        newProductIds = [product._id];
      }
      await User.findByIdAndUpdate(userId, { products: newProductIds });
      res.status(201).json({ message: 'Product Created', product: product });
    } catch (error) {
      next(error);
    }
  })
  .put('/updateProduct/:productId', verifyToken, async (req, res, next) => {
    const { productId: id } = req.params;
    try {
      let updatedProduct = req.body;

      if (updatedProduct.uploadedImages) {
        const existingProduct = await Product.findById(id);
        if (existingProduct) {
          updatedProduct.uploadedImages = [
            ...new Set([
                ...existingProduct.uploadedImages,
                ...updatedProduct.uploadedImages
            ])
          ];
        }
      }
      const product = await Product.findByIdAndUpdate(id, updatedProduct, {
        new: true,
      });
      if (!product) {
        next(handleError(404, 'Product not found'));
      }
      res
        .status(200)
        .json({ message: 'updated the product', product: product });
    } catch (error) {
      next(error);
    }
  })
  .delete('/deleteProduct/:productId', verifyToken, async (req, res, next) => {
    const { productId: id } = req.params;
    try {
      const userId = req.decoded.data;
      var user = await User.findById(userId);
      var productsIds = user.products;
      productsIds = productsIds.filter(ids => ids !== id);
      await User.findByIdAndUpdate(userId, { products: productsIds });
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        next(handleError(404, 'Product not found'));
      }
      res.status(200).json({ message: 'Product Deleted' });
    } catch (error) {
      next(error);
    }
  });
module.exports = router;
