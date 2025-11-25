import { PRODUCT_DATABASE } from '../data/products.js';

export function searchProducts(query, category = null) {
  if (!query) return [];

  const lowerQuery = query.toLowerCase();
  const results = [];

  for (const product of PRODUCT_DATABASE) {
    // Filter by category if specified
    if (category && product.category !== category) {
      continue;
    }

    // Simple text matching (in production, use proper search indexing)
    const searchableText = `${product.name} ${product.description} ${product.partNumber} ${product.compatibleModels?.join(' ') || ''}`.toLowerCase();
    
    if (searchableText.includes(lowerQuery)) {
      results.push(product);
    }
  }

  // Sort by relevance (simple: exact matches first)
  results.sort((a, b) => {
    const aNameMatch = a.name.toLowerCase().includes(lowerQuery);
    const bNameMatch = b.name.toLowerCase().includes(lowerQuery);
    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;
    return 0;
  });

  return results;
}

export function getProductById(id) {
  return PRODUCT_DATABASE.find(p => p.id === id);
}

export function checkCompatibility(productId, applianceModel) {
  const product = getProductById(productId);
  
  if (!product) {
    return {
      compatible: false,
      message: 'Product not found'
    };
  }

  if (!product.compatibleModels || product.compatibleModels.length === 0) {
    return {
      compatible: true,
      message: 'Compatibility information not available. Please verify with your appliance model number.'
    };
  }

  // Check if model matches (case-insensitive, partial match)
  const modelUpper = applianceModel.toUpperCase();
  const isCompatible = product.compatibleModels.some(model => 
    model.toUpperCase().includes(modelUpper) || modelUpper.includes(model.toUpperCase())
  );

  return {
    compatible: isCompatible,
    message: isCompatible 
      ? `This part is compatible with model ${applianceModel}`
      : `This part may not be compatible with model ${applianceModel}. Compatible models include: ${product.compatibleModels.slice(0, 5).join(', ')}`
  };
}

