import { useState } from "react";
import { useUserContext } from "../context";
import { API_URL, ErrorResponse, EditAddressCredentials } from "../shared/api";
import { Address } from "../shared/types";

type EditAddressRequestFunction = (credentials: EditAddressCredentials) => Promise<ErrorResponse | Address>

type UseEditAddressInfoContract = [EditAddressRequestFunction, {isLoading: boolean, error: string | null}]

export function useEditAddress(): UseEditAddressInfoContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const {token} = useUserContext()

    const editUserInfo: EditAddressRequestFunction = async (credentials) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/user/addresses/${credentials.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
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


    return [editUserInfo, {isLoading, error}]
}