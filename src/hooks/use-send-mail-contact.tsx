import { useState } from "react"
import { API_URL, ContactFormCredentials, ErrorResponse,  } from "../shared/api"

type SendContactMailRequestFunction = (credentials: ContactFormCredentials) => Promise<ErrorResponse | {message: string}>

type UseSendContactMailContract = [SendContactMailRequestFunction, {isLoading: boolean, error: string | null}]

export function useSendContactMail(): UseSendContactMailContract {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendContactMail: SendContactMailRequestFunction = async (credentials) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/user/contact`, {
                method: "POST",
                headers: {
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
    return [sendContactMail, {isLoading, error}]
}