import { useState } from 'react'
import { Eye, Plus } from 'lucide-react'
import { H2, DataPlaceholder } from '@uniweb/kit'
import { addToCart } from '../../components/cart-store.js'
import { ShopifyBuyButton } from '../../components/ShopifyBuyButton.jsx'
import { QuickView } from '../../components/QuickView.jsx'

/**
 * ProductGrid Component
 *
 * Displays products from a collection in a responsive grid.
 * Each card has hover actions for quick view and add-to-cart,
 * plus a Shopify buy button.
 */
export function ProductGrid({ content, params, block }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const products = content.data?.products || []
  const { columns } = params
  const { title } = content

  if (block.dataLoading) {
    return <DataPlaceholder lines={8} />
  }

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-24">
      {title && (
        <H2
          text={title}
          className="text-4xl font-light text-center mb-16"
        />
      )}

      <div className={`grid grid-cols-1 ${gridCols[columns] || gridCols[4]} gap-12`}>
        {products.map((product, i) => (
          <ProductCard
            key={product.slug || i}
            product={product}
            onQuickView={() => setSelectedProduct(product)}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}

function ProductCard({ product, onQuickView, onAddToCart }) {
  return (
    <div className="group">
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-100 mb-6 border border-neutral-200">
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={onQuickView}
            className="p-4 bg-white rounded-full hover:bg-primary-500 hover:text-white transition-all"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={onAddToCart}
            className="p-4 bg-neutral-900 text-white rounded-full hover:bg-primary-600 transition-all"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg">{product.title}</h3>
        <span className="font-medium text-neutral-500">
          ${Number(product.price).toFixed(2)}
        </span>
      </div>

      <p className="text-sm text-neutral-400 mb-4">{product.category}</p>

      <ShopifyBuyButton productId={product.slug || product.id} variant="outline" />
    </div>
  )
}

export default ProductGrid
