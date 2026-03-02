import { useEffect } from "react"


export function useGoHead(): () => void {
    function goHead(){
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    }
    
    useEffect(() => {
        goHead()
    }, [])
    return goHead
}