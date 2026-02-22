import { useState, useEffect } from "react"
import { Address } from "../shared/types"
import { API_URL, ErrorResponse } from "../shared/api"
import { useUserContext } from "../context"

type EditMyAddressesRequestFunction = () => Promise<ErrorResponse | Address[]>

type UseGetMyAddressesContract = [EditMyAddressesRequestFunction, {isLoading: boolean, error: string | null}]


export function useGetMyAddresses(): UseGetMyAddressesContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const {token} = useUserContext()
    
    const getAddresses: EditMyAddressesRequestFunction = async () => {
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
            return data
        } catch (error) {
            const message = "Network or server internal error. Please try again later."
            setError(message)
            return {error: message}
        } finally {
            setIsLoading(false)
        }
    }

    return [getAddresses, {error, isLoading}]
}