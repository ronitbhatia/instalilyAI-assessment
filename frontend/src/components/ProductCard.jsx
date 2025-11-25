function ProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-500">
              Part #: <span className="font-mono font-semibold">{product.partNumber}</span>
            </span>
            <span className="text-partselect-red font-bold text-lg">
              ${product.price}
            </span>
          </div>
          {product.compatibleModels && product.compatibleModels.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-500">
                Compatible with: {product.compatibleModels.slice(0, 3).join(', ')}
                {product.compatibleModels.length > 3 && ` +${product.compatibleModels.length - 3} more`}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex space-x-2">
        <button className="flex-1 bg-partselect-red text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm font-medium">
          View Details
        </button>
        <button className="flex-1 border border-partselect-red text-partselect-red px-4 py-2 rounded hover:bg-red-50 transition-colors text-sm font-medium">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard

