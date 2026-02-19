import { useState } from "react"
import { API_URL, ErrorResponse, LoginCredentials,  } from "../shared/api"

type LoginRequestFunction = (credentials: LoginCredentials) => Promise<ErrorResponse | {token: string}>

type UseLoginContract = [LoginRequestFunction, {isLoading: boolean, error: string | null}]

export function useLogin(): UseLoginContract {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login: LoginRequestFunction = async (credentials) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            if (response.status === 401) {
                const message = "Неправильний email або пароль."
                setError(message)
                return {error: message}
            } else if (response.status === 404) {
                const message = "Користувача з таким email не знайдено."
                setError(message)
                return {error: message}
            } else if (response.status === 500) {
                const message = "Server internal error. Please try again later."
                setError(message)
                return {error: message}
            }
            const data: {token: string} = await response.json()
            return data
        } catch (error) {
            const message = "Network or server internal error. Please try again later."
            setError(message)
            return {error: message}
        } finally {
            setIsLoading(false)
        }
    }
    return [login, {isLoading, error}]
}