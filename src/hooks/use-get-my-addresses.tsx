import { useState, useEffect } from "react"
import { Address } from "../shared/types"
import { API_URL } from "../shared/api"
import { useUserContext } from "../context"

interface UseGetProductsContract {
    addresses: Address[]
    isLoading: boolean
    error: string | null
}

export function useGetMyAddresses(): UseGetProductsContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [addresses, setAddresses] = useState<Address[]>([])
    const {token} = useUserContext()
    
    useEffect(() => {
        async function getAddresses() {
            try {
                setIsLoading(true)
                const response = await fetch(`${API_URL}/user/addresses`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                if (response.status === 401) {
                    const message = "Ваш токен порожній або неправильний. Авторизуйтесь заново."
                    setError(message)
                    return {error: message}
                } else if (response.status === 500) {
                    const message = "Проблеми з з'єднанням. Повторіть пізніше."
                    setError(message)
                    return {error: message}
                }
                const data: Address[] = await response.json()
                setAddresses(data)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        }
        getAddresses()
    }, [])

    return {
        isLoading, error, addresses
    }
}