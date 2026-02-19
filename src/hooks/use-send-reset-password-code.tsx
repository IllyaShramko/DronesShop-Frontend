import { useState } from "react"
import { API_URL, ErrorResponse } from "../shared/api"

type SendResetPasswordCodeRequestFunction = (credentials: {email: string, url: string}) => Promise<ErrorResponse | {message: string}>

type UseSendResetPasswordCodeContract = [SendResetPasswordCodeRequestFunction, {isLoading: boolean, error: string | null}]

export function useSendResetPasswordCode(): UseSendResetPasswordCodeContract {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendResetPasswordCode: SendResetPasswordCodeRequestFunction = async (credentials) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/user/password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            if (response.status === 400) {
                const message = "Invalid data."
                return {error: message}
            } else if (response.status === 404) {
                const message = "Користувача з такою електронною поштою не знайдено."
                setError(message)
                return {error: message}
            } else if (response.status === 500) {
                const message = "Server internal error. Please try again later."
                setError(message)
                return {error: message}
            }
            const data: {message: string} = await response.json()
            return data
        } catch (error) {
            const message = "Network or server internal error. Please try again later."
            setError(message)
            return {error: message}
        } finally {
            setIsLoading(false)
        }
    }
    return [sendResetPasswordCode, {isLoading, error}]
}