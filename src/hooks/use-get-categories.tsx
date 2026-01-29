import { useState, useEffect } from "react"
import { Category } from "../shared/types"
import { API_URL } from "../shared/api"

interface UseGetAllCaterogiers{
    Categories: Category[] | null
    isLodaing: boolean
    error: string | null
}

export function useGetAllCaterogiers(): UseGetAllCaterogiers{
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [Categories , setCategories] = useState<Category[] | null>(null)

    async function GetAllCaterogiers() {
        setIsLoading(true)
        try {
            const response = await fetch(`${API_URL}/Caterogy/`)
            if (response.ok) {
                const data: Category[] = await response.json()
                setCategories(data)
            } else {
                if(response.status === 404) {
                    setCategories(null)
                }
            }
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
        GetAllCaterogiers()
    }, [])

    return{
        Categories,
        isLodaing: isLoading,
        error
    }
}