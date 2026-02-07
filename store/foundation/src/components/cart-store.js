/**
 * Cart Store
 *
 * Module-level external store for cart state shared across all sections.
 * Uses useSyncExternalStore pattern — no React context needed.
 * Works because the entire foundation builds into a single bundle,
 * so module state is shared across all section components.
 */
import { useSyncExternalStore } from 'react'

let cart = []
let toastMessage = null
let cartOpen = false
const listeners = new Set()

function notify() {
  listeners.forEach((l) => l())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function addToCart(product) {
  const exists = cart.find((item) => item.id === product.id)
  if (exists) {
    cart = cart.map((item) =>
      item.id === product.id ? { ...item, qty: item.qty + 1 } : item
    )
  } else {
    cart = [...cart, { ...product, qty: 1 }]
  }
  toastMessage = `${product.title || product.name} added to bag!`
  setTimeout(() => {
    toastMessage = null
    notify()
  }, 3000)
  notify()
}

export function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId)
  notify()
}

export function updateQty(productId, delta) {
  cart = cart
    .map((item) =>
      item.id === productId ? { ...item, qty: item.qty + delta } : item
    )
    .filter((item) => item.qty > 0)
  notify()
}

export function openCart() {
  cartOpen = true
  notify()
}

export function closeCart() {
  cartOpen = false
  notify()
}

export function dismissToast() {
  toastMessage = null
  notify()
}

// Server snapshots return empty/initial state for SSR prerendering
export function useCart() {
  return useSyncExternalStore(subscribe, () => cart, () => [])
}

export function useCartOpen() {
  return useSyncExternalStore(subscribe, () => cartOpen, () => false)
}

export function useCartTotal() {
  return useSyncExternalStore(
    subscribe,
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    () => 0
  )
}

export function useCartCount() {
  return useSyncExternalStore(
    subscribe,
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    () => 0
  )
}

export function useToast() {
  return useSyncExternalStore(subscribe, () => toastMessage, () => null)
}
