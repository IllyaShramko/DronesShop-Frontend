import { useState } from "react"
import { API_URL, ErrorResponse, MakeOrderCredentials } from "../shared/api"
import { Order } from "../shared/types"
import { useUserContext } from "../context"

type MakeOrderRequestFunction = (credentials: MakeOrderCredentials) => Promise<ErrorResponse | Order>

type UseMakeOrderContract = [MakeOrderRequestFunction, {isLoading: boolean, error: string | null}]

export function useMakeOrder(): UseMakeOrderContract {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const {token} = useUserContext()

    const makeOrder: MakeOrderRequestFunction = async (credentials) => {
        try {
            setIsLoading(true)
            console.log(credentials)
            const response = await fetch(`${API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(credentials)
            })
            if (response.status === 400) {
                const message = "Неправильний формат данных, або їх недостатньо."
                setError(message)
                return {error: message}
            } else if (response.status === 500) {
                const message = "Server internal error. Please try again later."
                setError(message)
                return {error: message}
            }
            const data: Order = await response.json()
            return data
        } catch (error) {
            const message = "Network or server internal error. Please try again later."
            setError(message)
            return {error: message}
        } finally {
            setIsLoading(false)
        }
    }
    return [makeOrder, {isLoading, error}]
}