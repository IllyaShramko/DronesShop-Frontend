import { useEffect } from "react"


export function useGoHead(): () => void {
    function goHead(){
        window.scrollTo(0, 0)
    }
    useEffect(() => {
        goHead()
    }, [])
    return goHead
}