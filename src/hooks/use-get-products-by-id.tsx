import { useState, useEffect } from "react"
import { FullProduct, Product } from "../shared/types"
import { API_URL } from "../shared/api"

interface UseGetProductByIdParams{
    id: number
}

interface UseGetProductByIdContract{
    product: FullProduct | null
    isLoading: boolean
    error:  string | null
}
export function useGetProductById({id}: UseGetProductByIdParams): UseGetProductByIdContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)  
    const [error, setError] = useState<string | null>(null)
    const [product, setProduct] = useState<null | FullProduct>(null)

    async function getProductById({id}: UseGetProductByIdParams) {
        try {
            const response = await fetch(`${API_URL}/products/${id}`) 
            if(response.ok){
                const data: FullProduct  = await response.json()
                setProduct(data)
            } else{
                if (response.status === 404){
                    setProduct(null)
                }
            }
            setIsLoading(true)
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
        getProductById({id})
    }, [id])

    return {
        isLoading, error, product
    }
}