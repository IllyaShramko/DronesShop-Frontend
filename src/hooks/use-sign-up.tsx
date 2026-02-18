import { useState } from "react"
import { API_URL, ErrorResponse, RegisterCredentials,  } from "../shared/api"

type SignUpRequestFunction = (credentials: RegisterCredentials) => Promise<ErrorResponse | {token: string}>

type UseSignUpContract = [SignUpRequestFunction, {isLoading: boolean, error: string | null}]

export function useSignUp(): UseSignUpContract {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const signUp: SignUpRequestFunction = async (credentials) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            if (response.status === 400) {
                const message = "Неправильний email або пароль."
                setError(message)
                return {error: message}
            } else if (response.status === 409) {
                const message = "Користувач з таким email вже існує."
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
    return [signUp, {isLoading, error}]
}