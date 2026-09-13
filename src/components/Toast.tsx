import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Check, X } from 'lucide-react'

const ToastContext = createContext<(message: string) => void>(() => {})
export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const notify = useCallback((text: string) => {
    clearTimeout(timer.current); setMessage(text)
    timer.current = setTimeout(() => setMessage(''), 4000)
  }, [])
  useEffect(() => () => clearTimeout(timer.current), [])
  return <ToastContext.Provider value={notify}>{children}
    <div className="toast-region" aria-live="polite" aria-atomic="true">
      {message && <div className="toast"><Check size={18} /><span>{message}</span><button onClick={() => setMessage('')} aria-label="Dismiss notification"><X size={16} /></button></div>}
    </div>
  </ToastContext.Provider>
}
