import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react"
import type { Product } from "../shared/types"

type CartItem = {
    product: Product
    quantity: number
}

interface CartContextContract {
    items: CartItem[]
    addToCart: (product: Product, quantity?: number) => void
    removeFromCart: (productId: number) => void
    setQuantity: (productId: number, quantity: number) => void
    clearCart: () => void
    totalItems: number
    totalPrice: number
}

const STORAGE_KEY = "cart"

const CartContext = createContext<CartContextContract | null>(null)

function clampQty(qty: number) {
    if (!Number.isFinite(qty)) return 1
    return Math.max(1, Math.floor(qty))
}

function getEffectivePrice(product: Product) {
    const discount = Number(product.discount) || 0
    const price = Number(product.price) || 0
    const discounted = price * (1 - discount / 100)
    return Math.max(0, discounted)
}

export function CartContextProvider({ children }: PropsWithChildren) {
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (!raw) return []
            const parsed = JSON.parse(raw) as CartItem[]
            if (!Array.isArray(parsed)) return []
            return parsed
                .filter((x) => x && x.product && typeof x.product.id === "number")
                .map((x) => ({ product: x.product, quantity: clampQty(x.quantity) }))
        } catch {
            return []
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        } catch {
       
        }
    }, [items])

    function addToCart(product: Product, quantity: number = 1) {
        const q = clampQty(quantity)
        setItems((prev) => {
            const idx = prev.findIndex((i) => i.product.id === product.id)
            if (idx === -1) return [...prev, { product, quantity: q }]
            const next = [...prev]
            next[idx] = { product: next[idx].product, quantity: next[idx].quantity + q }
            return next
        })
    }

    function removeFromCart(productId: number) {
        setItems((prev) => prev.filter((i) => i.product.id !== productId))
    }

    function setQuantity(productId: number, quantity: number) {
        const q = clampQty(quantity)
        setItems((prev) =>
            prev.map((i) => (i.product.id === productId ? { ...i, quantity: q } : i)),
        )
    }

    function clearCart() {
        setItems([])
    }

    const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])

    const totalPrice = useMemo(
        () => items.reduce((sum, i) => sum + getEffectivePrice(i.product) * i.quantity, 0),
        [items],
    )

    const value: CartContextContract = {
        items,
        addToCart,
        removeFromCart,
        setQuantity,
        clearCart,
        totalItems,
        totalPrice,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error("Provider must wrap your app component")
    return ctx
}