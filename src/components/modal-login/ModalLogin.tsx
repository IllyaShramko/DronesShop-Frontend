import { useForm } from "react-hook-form"
import { ICONS } from "../../shared/icons"
import styles from "./modal-login.module.css"
import { LoginFormState, ModalLoginProps } from "./modal-login.types"

export function ModalLogin(props: ModalLoginProps) {
    const { isOpen, onClose, setIsOpenSignUp } = props
    const {register, handleSubmit, formState, setError, reset} = useForm<LoginFormState>()

    async function onSubmit(data: LoginFormState) {
        console.log("Form sended:", data)
        // const responseData = await sendContactMail(data)
        // if ("error" in responseData && responseData.error) {
        //     setError('root', {message: responseData.error})
        // } 
        // reset(formState.defaultValues)
    }
    
    // useEffect( () => {
    //     if (!error) return
    //     setError('root', {message: error})
    // } , [error])
    
    const nameError = formState.errors.name
    const emailError = formState.errors.email
    const passwordError = formState.errors.password
    const confirmPasswordError = formState.errors.confirmPassword
    const rootError = formState.errors.root

    if (!isOpen) return null
    return <>
        <div className={styles.overlay} onClick={onClose}></div>
        <form className={styles.modal}>
            <button onClick={onClose} className={styles.closeButton}>
                <ICONS.CloseCross className={styles.closeIcon} />
            </button>
            <div className={styles.header}>
                <button className={`${styles.headerButton} ${styles.buttonActive}`} >Авторизація</button>
                <p>/</p>
                <button className={`${styles.headerButton}`} onClick={() => setIsOpenSignUp(true)}>Реєстрація</button>
            </div>
            <div className={styles.body}>
                <label className={styles.formField}>
                    Email
                    <input type="email" {...register("email", {
                        required: {
                            value: true,
                            message: "Поле обов'язкове для заповнення"
                        }
                    })} />
                    <p className={styles.error}>{emailError?.message}</p>
                </label>
                <label className={styles.formField}>
                    Пароль
                    <input type="password" {...register("password", {
                        required: {
                            value: true,
                            message: "Поле обов'язкове для заповнення"
                        }
                    })} />
                    <p className={styles.error}>{passwordError?.message}</p>
                </label>
                <p>Забули пароль?</p>
                <p className={styles.error}>{rootError?.message}</p>
            </div>
            <div className={styles.footer}>
                <button type="button" className={styles.cancelButton} onClick={onClose}>Скасувати</button>
                <button type="submit" className={styles.submitButton} onClick={handleSubmit(onSubmit)}>Увійти</button>
            </div>
        </form>
    </>
}