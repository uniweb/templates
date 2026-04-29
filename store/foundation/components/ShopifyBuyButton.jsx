import { ShoppingBag } from 'lucide-react'

/**
 * Shopify Buy Button
 *
 * Mock implementation that opens a Shopify checkout URL.
 * Replace handlePurchase with the Shopify Buy Button JS SDK
 * for production use. See the developer guide for integration options.
 */
export function ShopifyBuyButton({ productId, variant = 'primary' }) {
  const handlePurchase = (e) => {
    e.stopPropagation()
    window.open(`https://checkout.shopify.com/mock/${productId}`, '_blank')
  }

  const base =
    'w-full py-3 px-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 cursor-pointer'

  const styles = {
    primary: `${base} bg-primary-700 hover:bg-primary-800 text-white shadow-lg shadow-primary-900/20`,
    outline: `${base} border-2 border-neutral-800 text-neutral-800 hover:bg-neutral-50`,
  }

  return (
    <button onClick={handlePurchase} className={styles[variant] || styles.primary}>
      <ShoppingBag size={18} /> Buy with Shopify
    </button>
  )
}
