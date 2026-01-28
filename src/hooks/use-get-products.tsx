import { useState, useEffect } from "react"
import { Product } from "../shared/types"
import { API_URL } from "../shared/api"

interface UseGetProductsContract {
    products: Product[] | null
    isLoading: boolean
    error: string | null
}

export function useGetProducts(): UseGetProductsContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [products, setProducts] = useState<Product[] | null>(null)

    async function getProducts() {
        try {
            const response = await fetch(`${API_URL}/products`)

            if (response.ok) {
                const data: Product[] = await response.json()
                setProducts(data)
            } else {
                if (response.status === 404) {
                    setProducts(null)
                }
            }

            setIsLoading(true)
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return {
        isLoading, error, products
    }
}