import { useCartContext } from "../../context"
import styles from "./message-header.module.css"
import { useEffect, useState } from "react"

export function MessageHeader() {
    const {items} = useCartContext()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (items.length === 0) return
        setIsOpen(true)
        setTimeout(() => {
            setIsOpen(false)
        }, 5000)
    }, [items])

    return <div className={styles.modal}>
        <div className={`${styles.hidemodal} ${isOpen && styles.openmodal}`}>
            <p>Товар додано до кошика!</p>
        </div>
    </div>
}