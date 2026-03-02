import { useState } from "react";
import { useUserContext } from "../context";
import { API_URL, ErrorResponse } from "../shared/api";

type CancelOrderRequestFunction = (credentials: {id: number}) => Promise<ErrorResponse>

type UseCancelOrderContract = [CancelOrderRequestFunction, {isLoading: boolean, error: string | null}]

export function useCancelOrder(): UseCancelOrderContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const {token} = useUserContext()

    const cancelOrder: CancelOrderRequestFunction = async (credentials) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/orders/${credentials.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 400) {
                const message = "Invalid data."
                setError(message)
                return {error: message}
            } else if (response.status === 403) {
                const message = "Forbidden."
                setError(message)
                return {error: message}
            } else if (response.status === 500) {
                const message = "Server internal error. Please try again later."
                setError(message)
                return {error: message}
            }
            return {error: "OK"}
        } catch (error) {
            const message = "Network or server internal error. Please try again later."
            setError(message)
            return {error: message}
        } finally {
            setIsLoading(false)
        }
    }


    return [cancelOrder, {isLoading, error}]
}