import { useState, useEffect } from "react"
import { FullProduct, Product } from "../shared/types"
import { API_URL } from "../shared/api"

interface UseGetSimilarProductsParams{
    id: number
}

interface UseGetSimilarProductContract{
    products: Product[]
    isLoading: boolean
    error:  string | null
}
export function useGetSimilarProducts({id}: UseGetSimilarProductsParams): UseGetSimilarProductContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)  
    const [error, setError] = useState<string | null>(null)
    const [products, setProducts] = useState<Product[]>([])

    async function getSimilarProducts({id}: UseGetSimilarProductsParams) {
        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/products/suggestions?limit=4&sameAs=${id}`) 
            const data: Product[]  = await response.json()
            setProducts(data)
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                setError(error.message)
            }
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(isNaN(id)){
            return
        }
        getSimilarProducts({id})
    }, [id])

    return {
        isLoading, error, products
    }
}