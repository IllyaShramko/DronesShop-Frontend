import { useRef, useEffect } from "react"
import styles from "./modal-sign-up.module.css"
import { ModalSignUpProps } from "./modal-sign-up.types"

export function ModalSignUp(props: ModalSignUpProps) {
    const { isOpen, onClose } = props

    const modalRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!onClose || !modalRef.current) return

            const target = event.target as HTMLBodyElement
            if (!modalRef.current.contains(target)) {
                console.log(target)
                onClose()
            }
        }
        document.body.addEventListener('click', handleClickOutside)
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [])
    if (!isOpen) return null
    
    return (
        <div ref={modalRef} className={styles.modal}>
            ModalSignUp
        </div>
    )
}