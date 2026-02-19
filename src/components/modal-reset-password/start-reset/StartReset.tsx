import { useForm } from "react-hook-form"
import styles from "./start-reset.module.css"
import { ResetPasswordFormState, StartResetProps } from "./start-reset.types"
import { useSendResetPasswordCode } from "../../../hooks"
import { useState } from "react"

export function StartReset(props: StartResetProps) {
    const {register, handleSubmit, formState, setError, reset} = useForm<ResetPasswordFormState>()
    const {closeModal} = props
    const [sendMail, {isLoading, error}] = useSendResetPasswordCode()
    const [success, setSuccess] = useState<boolean>(false)
    
    async function onSubmit(data: ResetPasswordFormState) {
        console.log("Form sended:", data)
        const responseData = await sendMail({email: data.email, url: window.location.origin})
        console.log("Response data:", responseData)
        if ("error" in responseData && responseData.error) {
            setError('root', {message: responseData.error})
        } else if ("message" in responseData) {
            reset(formState.defaultValues)
            setSuccess(true)
        }
    }

    const emailError = formState.errors.email
    const rootError = formState.errors.root
    
    if (success) {
        return <div className={styles.container}>
            <div className={styles.header}>
                <p className={`${styles.headerButton} ${styles.buttonActive}`} >Відновлення пароля</p>
            </div>
            <div className={styles.body}>
                <p className={styles.informationText}>Лист для відновлення пароля успішно надіслано на вашу пошту!</p>
            </div>
            <div className={styles.footer}>
                <div className={styles.buttons}>
                    <button type="button" className={styles.cancelButton} onClick={closeModal}>Закрити</button>
                </div>
            </div>
        </div>
    }

    return <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.header}>
            <p className={`${styles.headerButton} ${styles.buttonActive}`} >Відновлення пароля</p>
        </div>
        <div className={styles.body}>
            <label className={styles.formField}>
                Email
                <input type="email" placeholder="Введіть email" className={emailError && styles.inputError} {...register("email", {
                    required: {
                        value: true,
                        message: "Поле обов'язкове для заповнення"
                    }
                })} />
                <p className={styles.error}>{emailError?.message}</p>
            </label>
            <p className={styles.error}>{rootError?.message}</p>
        </div>
        <div className={styles.footer}>
            <div className={styles.buttons}>
                <button type="button" className={styles.cancelButton} onClick={closeModal}>Скасувати</button>
                <button type="submit" className={styles.submitButton}>Надіслати лист</button>
            </div>
        </div>
    </form>
}