import { useState } from "react"
import { Address, OrderWithTrackingInfo } from "../shared/types"
import { API_URL, ErrorResponse } from "../shared/api"
import { useUserContext } from "../context"

type GetMyOrdersRequestFunction = () => Promise<ErrorResponse | OrderWithTrackingInfo[]>

type UseGetMyOrdersContract = [GetMyOrdersRequestFunction, {isLoading: boolean, error: string | null}]


export function useGetMyOrders(): UseGetMyOrdersContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const {token} = useUserContext()
    
    const getMyOrders: GetMyOrdersRequestFunction = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/user/orders`, {
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
            const data: OrderWithTrackingInfo[] = await response.json()
            return data
        } catch (error) {
            const message = "Network or server internal error. Please try again later."
            setError(message)
            return {error: message}
        } finally {
            setIsLoading(false)
        }
    }

    return [getMyOrders, {error, isLoading}]
}