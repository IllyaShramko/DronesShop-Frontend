import { useState } from "react"
import { AddressCredentials, API_URL, ErrorResponse,  } from "../shared/api"
import { Address } from "../shared/types"
import { useUserContext } from "../context"

type CreateNewAddressRequestFunction = (credentials: AddressCredentials) => Promise<ErrorResponse | Address>

type UseCreateNewAddressContract = [CreateNewAddressRequestFunction, {isLoading: boolean, error: string | null}]

export function useCreateNewAddress(): UseCreateNewAddressContract {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const {token} = useUserContext()

    const sendContactMail: CreateNewAddressRequestFunction = async (credentials) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/user/addresses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "city": credentials.city,
                    "street": credentials.street,
                    "houseNumber": +credentials.houseNumber,
                    "apartamentNumber": +credentials.apartamentNumber,
                    "entranceNumber": +credentials.entranceNumber
                })
            })
            if (response.status === 400) {
                const message = "Invalid data."
                setError(message)
                return {error: message}
            } else if (response.status === 500) {
                const message = "Server internal error. Please try again later."
                setError(message)
                return {error: message}
            }
            const data: Address = await response.json()
            return data
        } catch (error) {
            const message = "Network or server internal error. Please try again later."
            setError(message)
            return {error: message}
        } finally {
            setIsLoading(false)
        }
    }
    return [sendContactMail, {isLoading, error}]
}