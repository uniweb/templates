import { X } from 'lucide-react'
import { addToCart } from './cart-store.js'
import { ShopifyBuyButton } from './ShopifyBuyButton.jsx'

export function QuickView({ product, onClose }) {
  if (!product) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl bg-white rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-neutral-100 rounded-full z-10 hover:bg-neutral-200 transition-colors"
        >
          <X />
        </button>

        <div className="md:w-1/2 aspect-square md:aspect-auto">
          {product.image && (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="p-10 md:p-16 md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-light mb-4">{product.title}</h2>
          <div className="text-2xl font-bold mb-8">
            ${Number(product.price).toFixed(2)}
          </div>
          <p className="text-neutral-500 leading-relaxed mb-8">
            {product.longDescription || product.excerpt}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {product.features.map((f, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded-full"
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-4 mt-auto">
            <button
              onClick={() => {
                addToCart(product)
                onClose()
              }}
              className="w-full bg-neutral-900 text-white py-4 rounded-xl font-bold hover:bg-neutral-800 transition-colors"
            >
              Add to Bag
            </button>
            <ShopifyBuyButton productId={product.id} variant="outline" />
          </div>
        </div>
      </div>
    </div>
  )
}
