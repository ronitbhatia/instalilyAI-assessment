import express from 'express';
import { searchProducts, getProductById, checkCompatibility } from '../services/productService.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { query, category } = req.query;
    const products = searchProducts(query, category);
    res.json({ products });
  } catch (error) {
    console.error('Product search error:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ product });
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.post('/compatibility', async (req, res) => {
  try {
    const { productId, applianceModel } = req.body;
    
    if (!productId || !applianceModel) {
      return res.status(400).json({ error: 'Product ID and appliance model are required' });
    }
    
    const result = checkCompatibility(productId, applianceModel);
    res.json(result);
  } catch (error) {
    console.error('Compatibility check error:', error);
    res.status(500).json({ error: 'Failed to check compatibility' });
  }
});

export { router as productsRouter };

