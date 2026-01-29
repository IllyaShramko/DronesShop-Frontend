import { useState, useEffect } from "react"
import { Product } from "../shared/types"
import { API_URL } from "../shared/api"

interface UseGetProductsContract {
    products: Product[]
    isLoading: boolean
    error: string | null
}

export function useGetProducts(): UseGetProductsContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [products, setProducts] = useState<Product[]>([])

    useEffect( () => {
        async function getProducts() {
            try {
                setIsLoading(true)
                const response = await fetch(`${API_URL}/products`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                const data: Product[] = await response.json()
                setProducts(data)
            } catch (error) {
                console.error(error)
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        }
        getProducts()
    }, [])

    return {
        isLoading, error, products
    }
}