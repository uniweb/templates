import { CheckCircle2 } from 'lucide-react'
import { useToast } from './cart-store.js'

export function Toast() {
  const message = useToast()

  if (!message) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up bg-neutral-900 border border-white/10 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
      <CheckCircle2 size={18} className="text-primary-400" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}
