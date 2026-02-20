import styles from "./continue-reset.module.css"
import { useForm } from "react-hook-form"
import { ContinueResetPasswordFormState, ContinueResetProps } from "./continue-reset.types"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useSendResetPassword, useVerifyCode } from "../../../hooks"



export function ContinueReset(props: ContinueResetProps) {
    const {register, handleSubmit, formState, setError, reset} = useForm<ContinueResetPasswordFormState>()
    const {closeModal, setLogin} = props
    const [verifyCode, {isLoading: verifyLoading, error: verifyError}] = useVerifyCode()
    const [sendResetPassword, {isLoading: sendLoading, error: sendError}] = useSendResetPassword()
    const [searchParams] = useSearchParams()
    const [success, setSuccess] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const code = searchParams.get('code')

    useEffect(() => {
        async function verifyResetCode() {
            if (!code) {
                setError('root', {message: "Invalid reset code"})
                return
            }
            const responseData = await verifyCode({code: code})
            if ("error" in responseData && responseData.error) {
                setError('root', {message: "Invalid reset code"})
                return
            }
            if ("email" in responseData && "message" in responseData) {
                if (!responseData.email) {
                    switch (responseData.message){
                        case "CODE_DOESNT_EXISTS":
                            setError('root', {message: "Такого коду не існує."})
                            return
                        case "CODE_EXPIRED":
                            setError('root', {message: "Цей код вже був використаний для відновлення, або його час дії пройшов."})
                            return
                    }
                    return
                }
                setEmail(responseData.email)
            }
        }
        verifyResetCode()
    }, [code, setError, verifyCode])

    async function onSubmit(data: ContinueResetPasswordFormState) {
        if (email === "") {
            return  
        }
        console.log("Form sended:", data)
        if (data.password !== data.confirmPassword) {
            setError('confirmPassword', {message: "Паролі не співпадають"})
            return
        }
        if (!code) {
            setError('root', {message: "Invalid reset code"})
            return
        }
        const response = await sendResetPassword({code, email: email, newPassword: data.password})
        if ("error" in response && response.error) {
            setError('root', {message: response.error})
        } else if ("message" in response) {
            reset(formState.defaultValues)
            setSuccess(true)
        }
    }

    if (success) {
        return <div className={styles.container}>
            <div className={styles.header}>
                <p className={`${styles.headerButton} ${styles.buttonActive}`} >Новий пароль</p>
            </div>
            <div className={styles.body}>
                <p className={styles.informationText}>Пароль успішно змінено!<br />Тепер ви можете увійти з новим паролем</p>
            </div>
            <div className={styles.footer}>
                <div className={styles.buttons}>
                    <button type="button" className={styles.submitButton} onClick={setLogin}>Увійти</button>
                </div>
            </div>
        </div>
    }
    const passwordError = formState.errors.password
    const confirmPasswordError = formState.errors.confirmPassword
    const rootError = formState.errors.root

    return <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.header}>
            <p className={`${styles.headerButton} ${styles.buttonActive}`}>Новий пароль</p>
        </div>
        <div className={styles.body}>
            <label className={styles.formField}>
                Пароль
                <input type="password" placeholder="Ваш новий пароль" className={passwordError && styles.inputError} {...register("password", {
                    required: {
                        value: true,
                        message: "Поле обов'язкове для заповнення"
                    }
                })} />
                <p className={styles.error}>{passwordError?.message}</p>
            </label>
            <label className={styles.formField}>
                Підтвердження пароля
                <input type="password" placeholder="Підтвердження нового пароля" className={confirmPasswordError && styles.inputError} {...register("confirmPassword", {
                    required: {
                        value: true,
                        message: "Поле обов'язкове для заповнення"
                    }
                })} />
                <p className={styles.error}>{confirmPasswordError?.message}</p>
            </label>
            <p className={styles.error}>{rootError?.message}</p>
        </div>
        <div className={styles.footer}>
            <div className={styles.buttons}>
                <button type="button" className={styles.cancelButton} onClick={closeModal}>Скасувати</button>
                <button type="submit" className={styles.submitButton}>Зберегти новий пароль</button>
            </div>
        </div>
    </form>
}

