import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem, Product } from "../shared/types";


interface CartContextContract {
    items: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (id: number) => void
    isInCart: (id:number) => boolean
    incrementCount: (id: number) => void
    decrementCount: (id: number) => void
    removeAll: () => void
    totalPrice: () => number
    discountedPrice: () => number
}

const CartContext = createContext<CartContextContract | null>(null)


export function CartContextProvider({children}: {children: ReactNode}) {
    const [items, setItems] = useState<CartItem[]>([])

    function addToCart(product: Product) {
        if (isInCart(product.id)) {
            incrementCount(product.id)
            return
        }

        const newItems = [...items, {...product, count: 1}]
        setItems(newItems)
    }
    
    function removeFromCart(id: number) {
        const newItems = items.filter(item => item.id !== id)
        setItems(newItems)
    }

    function isInCart(id: number): boolean {
        return items.some(cartItem => cartItem.id === id)
    }
    function incrementCount(id: number) {
        if (!isInCart(id)) return
        const newItems = items.map(cartItem => {
            if (cartItem.id === id) {
                return {
                    ...cartItem,
                    count: cartItem.count + 1
                }
            }
            return cartItem
        })
        setItems(newItems)
    }
    function decrementCount(id: number) {
        if (!isInCart(id)) return
        const newItems = items.map(cartItem => {
            if (cartItem.id === id) {
                if (cartItem.count === 1) {
                    return {
                        ...cartItem
                    }
                }
                return {
                    ...cartItem,
                    count: cartItem.count - 1
                }
            }
            return cartItem
        })
        setItems(newItems)
        
    }
    function removeAll(){
        setItems([])
    }
    
    function totalPrice(): number{
        return items.reduce( (prevValue, item) => {
            return prevValue + item.price * item.count
        }, 0)
    }
    function discountedPrice(): number{
        return items.reduce((prevValue, item) => {
            return prevValue + item.price * (1 - item.discount / 100) * item.count
        }, 0)
    }
    return <CartContext value={{
        items,
        addToCart,
        removeFromCart,
        incrementCount,
        decrementCount,
        isInCart,
        removeAll,
        totalPrice,
        discountedPrice
    }}>
        {children}
    </CartContext>
}

export function useCartContext() {
    const cartContext = useContext(CartContext)
    if (!cartContext) throw new Error("Provider must wrap your app component")
    
    return cartContext
}