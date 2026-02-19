import { useEffect, useState } from "react"
import { API_URL, ErrorResponse } from "../shared/api"

type VerifyCodeRequestFunction = (credentials: {code: string}) => Promise<ErrorResponse | {message: string, email: string | null}>

type UseVerifyCodeContract = [VerifyCodeRequestFunction, {isLoading: boolean, error: string | null}]

export function useVerifyCode(): UseVerifyCodeContract {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const verifyCode: VerifyCodeRequestFunction = async (credentials) => {
        try {
            setIsLoading(true)
            const response = await fetch(`${API_URL}/user/password/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            if (response.status === 400) {
                const message = "Invalid data."
                return {error: message}
            } else if (response.status === 500) {
                const message = "Server internal error. Please try again later."
                setError(message)
                return {error: message}
            }
            const data: {message: string, email: string | null} = await response.json()
            return data
        } catch (error) {
            const message = "Network or server internal error. Please try again later."
            setError(message)
            return {error: message}
        } finally {
            setIsLoading(false)
        }
    }
    return [verifyCode, {isLoading, error}]
}
