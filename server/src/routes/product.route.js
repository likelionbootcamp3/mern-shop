import { Router } from "express";
import Product from "../models/Product";

const router = Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find(req.query);
  res.json({ products: products, total: 100, skip: 0, limit: 30 });
});

// Add a product
router.post("/add", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Get all products categories
router.get("/categories", async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
});

// Search product
router.get("/search", async (req, res) => {
  const products = await Product.find({
    title: { $regex: req.query.q, $options: "i" },
  });
  res.json({ products: products, limit: 10, skip: 0 });
});

// Get product by id
router.get("/:productId", async (req, res) => {
  const product = await Product.findById(req.params.productId);

  if (!product) {
    return res.json({
      message: `Product with id '${req.params.productId}' not found`,
    });
  }
  res.json(product);
});

// Update a product
router.put("/:productId", async (req, res) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    { new: true }
  );

  res.json(updateProduct);
});

// Delete a product
router.delete("/:productId", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
  res.json(deletedProduct);
});

// Get products of category
router.get("/category/:category", async (req, res) => {
  const products = await Product.find({ category: req.params.category });
  res.json({ products: products, total: 5, skip: 0, limit: 5 });
});

export default router;
