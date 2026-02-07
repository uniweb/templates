import { X, Plus, Minus } from 'lucide-react'
import { useCart, useCartOpen, useCartTotal, closeCart, updateQty, removeFromCart } from './cart-store.js'

export function CartDrawer() {
  const cart = useCart()
  const isOpen = useCartOpen()
  const total = useCartTotal()

  return (
    <div className={`fixed inset-0 z-50 transition-all ${isOpen ? 'visible' : 'invisible pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeCart}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-white p-8 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-light">Your Bag</h2>
            <button onClick={closeCart} className="p-1 hover:opacity-70 transition-opacity">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-6">
            {cart.length === 0 ? (
              <p className="text-neutral-400 italic">Empty bag.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-bold">{item.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="p-1 hover:bg-neutral-100 rounded"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs text-neutral-500">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="p-1 hover:bg-neutral-100 rounded"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="font-bold">${(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="pt-8 border-t border-neutral-100 space-y-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-neutral-900 text-white py-5 rounded-2xl font-bold hover:bg-neutral-800 transition-colors">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
