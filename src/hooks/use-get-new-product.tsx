import { useState, useEffect } from "react"
import { Product } from "../shared/types"
import { API_URL } from "../shared/api"

interface UseGetNewProductsContract {
    products: Product[] | null
    isLoading: boolean
    error: string | null
}

export function useGetNewProducts(): UseGetNewProductsContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [products, setProducts] = useState<Product[] | null>(null)

    async function getNewProducts() {
        try {
            const response = await fetch(`${API_URL}/products/suggestions?new=true&limit=4`)

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
        getNewProducts()
    }, [])

    return {
        isLoading, error, products
    }
}