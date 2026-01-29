import { useState, useEffect } from "react"
import { Category } from "../shared/types"
import { API_URL } from "../shared/api"

interface UseGetCategoriesContract {
    categories: Category[]
    isLoading: boolean
    error: string | null
}

export function useGetCategories(): UseGetCategoriesContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [categories, setCategories] = useState<Category[]>([])
    
    useEffect( () => {
        async function getCategories() {
            try {
                setIsLoading(true)
                const response = await fetch(`${API_URL}/categories`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                const data: Category[] = await response.json()
                setCategories(data)
            } catch (error) {
                console.error(error)
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        }
        getCategories()
    }, [])

    return {
        isLoading, error, categories
    }
}