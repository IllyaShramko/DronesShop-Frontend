import { useForm } from "react-hook-form"
import { ICONS } from "../../shared/icons"
import styles from "./modal-sign-up.module.css"
import { SignUpFormState, ModalSignUpProps } from "./modal-sign-up.types"
import { useLogin, useSignUp } from "../../hooks"
import { use, useEffect, useState } from "react"
import { useUserContext } from "../../context"
import { useNavigate } from "react-router-dom"

export function ModalSignUp(props: ModalSignUpProps) {
    const { isOpen, onClose, setIsOpenLogin } = props
    const {register, handleSubmit, formState, setError, reset} = useForm<SignUpFormState>()
    const [signUp, {isLoading, error}] = useSignUp()
    const [success, setSuccess] = useState(false)

    async function onSubmit(data: SignUpFormState) {
        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", {message: "Паролі не співпадають"})
            return
        }
        console.log("Form sended:", data)
        const responseData = await signUp(data)
        if ("error" in responseData && responseData.error) {
            setError('root', {message: responseData.error})
        } else if ("token" in responseData) {
            setSuccess(true)
        }
        reset(formState.defaultValues)
    }
    
    useEffect(() => {
        if (!error) return
        setError('root', {message: error})
    } , [error])
    
    const firstNameError = formState.errors.firstName
    const emailError = formState.errors.email
    const passwordError = formState.errors.password
    const confirmPasswordError = formState.errors.confirmPassword
    const rootError = formState.errors.root
    

    if (!isOpen) return null

    if (success) {
        return <>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.modal}>
                <button onClick={onClose} className={styles.closeButton}>
                    <ICONS.CloseCross className={styles.closeIcon} />
                </button>
                <div className={styles.header}>
                    <p className={`${styles.headerButton} ${styles.buttonActive}`}>Реєстрація</p>
                </div>
                <div className={styles.body}>
                    <p className={styles.informationText}>Акаунт успішно створено!</p>
                </div>
                <div className={styles.footer}>
                    <div className={styles.buttons}>
                        <button type="button" className={styles.submitButton} onClick={() => {
                            onClose()
                            setIsOpenLogin(true)
                            setSuccess(false)
                        }}>Перейти на сайт</button>
                    </div>
                </div>
            </div>
        </>
    }

    return <>
        <div className={styles.overlay} onClick={onClose}></div>
        <form className={styles.modal}>
            <button onClick={onClose} className={styles.closeButton}>
                <ICONS.CloseCross className={styles.closeIcon} />
            </button>
            <div className={styles.header}>
                <button className={`${styles.headerButton}`} onClick={() => setIsOpenLogin(true)}>Авторизація</button>
                <p className={styles.headerSeparator}>/</p>
                <p className={`${styles.headerButton} ${styles.buttonActive}`}>Реєстрація</p>
            </div>
            <div className={styles.body}>
                <label className={styles.formField}>
                    Ім'я
                    <input type="text" className={firstNameError && styles.errorInput} placeholder="Введіть ім'я" {...register("firstName", {
                        required: {
                            value: true,
                            message: "Поле обов'язкове для заповнення"
                        }
                    })} />
                    <p className={styles.error}>{formState.errors.firstName?.message}</p>
                </label>
                <label className={styles.formField}>
                    Email
                    <input type="email" className={emailError && styles.errorInput} placeholder="Введіть email" {...register("email", {
                        required: {
                            value: true,
                            message: "Поле обов'язкове для заповнення"
                        }
                    })} />
                    <p className={styles.error}>{emailError?.message}</p>
                </label>
                <label className={styles.formField}>
                    Пароль
                    <input type="password" className={passwordError && styles.errorInput} placeholder="Введіть пароль" {...register("password", {
                        required: {
                            value: true,
                            message: "Поле обов'язкове для заповнення"
                        }
                    })} />
                    <p className={styles.error}>{passwordError?.message}</p>
                </label>
                <label className={styles.formField}>
                    Підтвердження пароля
                    <input type="password" className={confirmPasswordError && styles.errorInput} placeholder="Повторіть пароль" {...register("confirmPassword", {
                        required: {
                            value: true,
                            message: "Поле обов'язкове для заповнення"
                        }
                    })} />
                    <p className={styles.error}>{confirmPasswordError?.message}</p>
                </label>
                <button className={styles.alreadyRegistered} onClick={() => {
                    setIsOpenLogin(true)
                }}>Вже є акаунт? Увійти</button>
                <p className={styles.error}>{rootError?.message}</p>
            </div>
            <div className={styles.footer}>
                <div className={styles.buttons}>
                    <button type="button" className={styles.cancelButton} onClick={onClose}>Скасувати</button>
                    <button type="submit" className={styles.submitButton} onClick={handleSubmit(onSubmit)}>Зареєструватися</button>
                </div>
                <div>
                    <p className={styles.informationText}>
                        При вході або реєстрації, я підтверджую згоду з умовами <span>публічного договору</span>
                    </p>
                </div>
            </div>
        </form>
    </>
}