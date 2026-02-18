import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import type { User } from "../shared/types"

interface UserContextContract {
    token: string | null
    user: User | null
    setUser: (user: User | null) => void
    setToken: (token: string | null) => void
}

const UserContext = createContext<UserContextContract | null>(null)

export function UserContextProvider({children}: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    function setTokenWithStorage(token: string | null){
        if (token) {
            localStorage.setItem('token', token)
        }
        setToken(token)
    }

    return <UserContext value={{user, token, setUser, setToken: setTokenWithStorage}}>{children}</UserContext>
}
export function useUserContext() {
    const ctx = useContext(UserContext)
    if (!ctx) throw new Error("Provider must wrap your app component")
    
    return ctx
}