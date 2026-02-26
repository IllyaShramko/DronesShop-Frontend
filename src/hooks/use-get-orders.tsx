import { useState, useEffect } from "react"
import { Order } from "../shared/types"
import { API_URL } from "../shared/api"

interface UseGetOrdersContract {
    orders: Order[]
    isLoading: boolean
    error: string | null
}

export function useGetOrders(): UseGetOrdersContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        async function getOrders() {
            try {
                setIsLoading(true)
                const response = await fetch(`${API_URL}/orders`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const data: Order[] = await response.json()
                setOrders(data)
            } catch (error) {
                console.error(error)
                if (error instanceof Error) {
                    setError(error.message)
                }
            } finally {
                setIsLoading(false)
            }
        }

        getOrders()
    }, [])

    return {
        orders,
        isLoading,
        error,
    }
}