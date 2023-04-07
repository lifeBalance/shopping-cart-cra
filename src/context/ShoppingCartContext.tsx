import { createContext, ReactNode, useContext, useState } from 'react'
import { ShoppingCart } from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  openCart: () => void
  closeCart: () => void
  cartQuantity: number
  cartItems: CartItem[]
  cartIsOpen: boolean
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

// to use wherever we want to access the content
export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

// to use wherever we want to make available the provider
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  // const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])
  const [cartIsOpen, setCartIsOpen] = useState(false)

  function openCart() {
    setCartIsOpen(true)
  }

  function closeCart() {
    setCartIsOpen(false)
  }

  const cartQuantity = cartItems.reduce((acc, cur) => acc + cur.quantity, 0)

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === id) === undefined) {
        return [...prev, { id, quantity: 1 }]
      } else {
        // return [...prev, { id, quantity: prev[id].quantity + 1 }] // does not work 🤔
        return prev.map((item) => {
          return item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        })
      }
    })
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === id)?.quantity === 1) {
        return prev.filter((item) => item.id !== id)
      } else {
        // return [...prev, { id, quantity: prev[id].quantity - 1 }] // does not work 🤔
        return prev.map((item) => {
          return item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        cartIsOpen
      }}
    >
      {children}
      <ShoppingCart  />
    </ShoppingCartContext.Provider>
  )
}
