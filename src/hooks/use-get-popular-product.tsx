import { useState, useEffect } from "react"
import { Product } from "../shared/types"
import { API_URL } from "../shared/api"

interface UseGetPopularProductsParams{
    limit: number,
    offset: number
}

interface UseGetPopularProductsContract {
    products: Product[] | null
    isLoading: boolean
    error: string | null
}

export function useGetPopularProducts({limit, offset}: UseGetPopularProductsParams): UseGetPopularProductsContract {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [products, setProducts] = useState<Product[] | null>(null)

    async function getPopularProducts() {
        try {
            const response = await fetch(`${API_URL}/products/suggestions?popular=true&limit=${limit ? limit : 4}`)

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
        getPopularProducts()
    }, [])

    return {
        isLoading, error, products
    }
}