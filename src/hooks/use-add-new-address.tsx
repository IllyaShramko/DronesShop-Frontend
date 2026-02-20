import { useState, useEffect } from "react"
import { API_URL } from "../shared/api"

export interface Address {
    id: number
    city: string
    street: string
}

interface UseGetAddressContract {
    address: Address | null
    isLoading: boolean
    error: string | null
}

export function useGetAddress(id: number): UseGetAddressContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [address, setAddress] = useState<Address | null>(null)

    useEffect(() => {
        if (!id) return

        async function getAddress() {
            try {
                setIsLoading(true)

                const response = await fetch(`${API_URL}/address/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) {
                    throw new Error("Failed to fetch address")
                }

                const data: Address = await response.json()
                setAddress(data)

            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError("Unknown error")
                }
            } finally {
                setIsLoading(false)
            }
        }

        getAddress()
    }, [id])

    return {
        address,
        isLoading,
        error,
    }
}