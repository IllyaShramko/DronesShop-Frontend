import { useForm } from "react-hook-form"
import styles from "./modal-reset.module.css"
import { ModalResetPasswordProps, ResetPasswordFormState } from "./modal-reset.types"
import { ICONS } from "../../shared/icons"
import { useEffect } from "react"

export function ModalResetPassword(props: ModalResetPasswordProps) {
    const { isOpen, onClose } = props
    const {register, handleSubmit, formState, setError, reset} = useForm<ResetPasswordFormState>()
    
    const emailError = formState.errors.email
    const rootError = formState.errors.root

    useEffect(() => {
        return () => {
            reset()
        }
    }, [])
    if (!isOpen) return null

    return <>
        <div className={styles.overlay} onClick={onClose}></div>
        <div className={styles.modal}>
            <button onClick={onClose} className={styles.closeButton}>
                <ICONS.CloseCross className={styles.closeIcon} />
            </button>
            <div className={styles.header}>
                <p className={`${styles.headerButton} ${styles.buttonActive}`} >Відновлення пароля</p>
            </div>
            <form className={styles.body}>
                <label className={styles.formField}>
                    Email
                    <input type="email" className={emailError && styles.inputError} {...register("email", {
                        required: {
                            value: true,
                            message: "Поле обов'язкове для заповнення"
                        }
                    })} />
                    <p className={styles.error}>{emailError?.message}</p>
                </label>
            </form>
            <div className={styles.footer}>
                <div className={styles.buttons}>
                    <button type="button" className={styles.cancelButton} onClick={onClose}>Скасувати</button>
                    <button type="button" className={styles.submitButton} onClick={onClose}>Надіслати лист</button>
                </div>
            </div>
        </div>
    </>
}