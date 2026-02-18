import { useEffect, useState } from "react";
import { useUserContext } from "../context";
import { API_URL } from "../shared/api";
import { User } from "../shared/types";


export function useGetMe() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const {token, setUser, setToken} = useUserContext()

    const getMe = async () => {
        if (!token) return;
        try {
            setIsLoading(true);
            const request = await fetch(`${API_URL}/user/me`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if (request.status === 401) {
                setError("Token error")
                return;
            } else if (request.status === 404) {
                setError("User not found. Token is corrupted")
                return;
            } else if (request.status === 500) {
                setError("Server error.")
                return;
            }
            const data: User = await request.json()
            setUser(data)
        } catch (error) {
            if (error instanceof Error) {
                setError("Network Error occured. Try again later.")
                return
            }
            setError("Error occured. Try again later.")
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        const tokenFromLocalStorage = localStorage.getItem('token')
        if (!tokenFromLocalStorage) return;
        setToken(tokenFromLocalStorage)
    }, [])

    useEffect( () => {
        if (!token) return
        getMe()
    }, [token])

    
    return [getMe, {isLoading, error}]
}