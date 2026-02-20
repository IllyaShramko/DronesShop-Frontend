import { useEffect, useState } from "react";
import { useUserContext } from "../context";
import { API_URL, ErrorResponse, UserInformationEditCredentials } from "../shared/api";
import { User } from "../shared/types";

type EditUserInfoRequestFunction = (credentials: UserInformationEditCredentials) => Promise<ErrorResponse | User>

type UseEditUserInfoContract = [EditUserInfoRequestFunction, {isLoading: boolean, error: string | null}]

export function useEditUserInfo(): UseEditUserInfoContract {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const {token, setUser} = useUserContext()

    const editUserInfo: EditUserInfoRequestFunction = async (credentials) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/user/me`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
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
            const data: User = await response.json()
            setUser(data)
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