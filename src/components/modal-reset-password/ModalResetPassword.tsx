import { useForm } from "react-hook-form"
import styles from "./modal-reset.module.css"
import { ModalResetPasswordProps } from "./modal-reset.types"
import { ICONS } from "../../shared/icons"
import { useEffect } from "react"
import { StartReset } from "./start-reset"
import { ContinueReset } from "./continue-reset"
import { useNavigate } from "react-router-dom"

export function ModalResetPassword(props: ModalResetPasswordProps) {
    const { isOpen, onClose, lastPageModal, setLastPageModal } = props
    const navigate = useNavigate()
    console.log("lastPageModal", lastPageModal)
    useEffect(() => {
        return () => {
            setLastPageModal("login")
        }
    }, [])

    function closeModal() {
        onClose()
        setLastPageModal("login")
    }
    function setLogin() {
        navigate("/")
        setLastPageModal("login")
    }

    if (!isOpen) return null

    return <>
        <div className={styles.overlay} onClick={closeModal}></div>
        <div className={styles.modal}>
            <button onClick={closeModal} className={styles.closeButton}>
                <ICONS.CloseCross className={styles.closeIcon} />
            </button>
            {
                lastPageModal === "resetPassword" 
                ? <StartReset closeModal={closeModal} />
                : <ContinueReset closeModal={closeModal} setLogin={setLogin} />
            }
        </div>
    </>
}