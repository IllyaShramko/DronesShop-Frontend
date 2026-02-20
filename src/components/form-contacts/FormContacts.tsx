import { useForm } from "react-hook-form"
import { ContactFormState } from "./form-contacts.types"
import { useSendContactMail } from "../../hooks"
import { useEffect } from "react"
import styles from "./form-contacts.module.css"
import { useUserContext } from "../../context"

export function FormContacts() {
    const {register, handleSubmit, formState, setError, reset} = useForm<ContactFormState>()
    const [sendContactMail, {isLoading, error}] = useSendContactMail()
    const {user} = useUserContext()

    async function onSubmit(data: ContactFormState) {
        const responseData = await sendContactMail(data)
        if ("error" in responseData && responseData.error) {
            setError('root', {message: responseData.error})
        } 
        reset(formState.defaultValues)
    }
    
    useEffect(() => {
        if (!error) return
        setError('root', {message: error})
    } , [error])

    const nameError = formState.errors.name
    const phonenumberError = formState.errors.phonenumber
    const emailError = formState.errors.email
    const messageError = formState.errors.message
    const rootError = formState.errors.root

    return <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
            <h2>Зв'язатися з нами</h2>
        </div>
        <div>
            <label className={styles.formField}>
                Ім'я:
                <input type="text" className={nameError && styles.errorInput} defaultValue={user?.firstName} placeholder="Ваше ім'я" {...register("name", {
                    required: {
                        value: true,
                        message: "Ім'я є обов'язковим полем"
                    }
                })} />
                <p className={styles.error}>{nameError?.message}</p>
            </label>
            
            <label className={styles.formField}>
                Телефон:
                <input type="text" className={phonenumberError && styles.errorInput} defaultValue={user?.phoneNumber ?? ""} placeholder="+ 38 0" {...register("phonenumber", {
                    required: {
                        value: true,
                        message: "Телефон є обов'язковим полем"
                    },
                    validate: (value) => {
                        if (!value.includes("+380")) return "Невірний формат телефону. Введіть номер у форматі +380XXXXXXXXX"
                    }
                })} />
                <p className={styles.error}>{phonenumberError?.message}</p>
            </label>
            
            <label className={styles.formField}>
                Email:
                <input type="email" className={emailError && styles.errorInput} defaultValue={user?.email} placeholder="Ваш E-mail" {...register("email", {
                    required: {
                        value: true,
                        message: "Email є обов'язковим полем"
                    },
                    validate: (value) => {
                        if (!value.includes("@")  || !value.includes(".")) return "Невірний формат email. Введіть email у форматі user@domain.com"
                    }
                })} />
                <p className={styles.error}>{emailError?.message}</p>
            </label>
            
            <label className={styles.formField}>
                Повідомлення:
                <textarea className={messageError && styles.errorInput} placeholder="Ваше повідомлення" {...register("message", {
                    required: {
                        value: true,
                        message: "Повідомлення є обов'язковим полем"
                    }
                })} />
                <p className={styles.error}>{messageError?.message}</p>
            </label>
            <p className={styles.error}>{rootError?.message}</p>
        </div>
        <div>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>Надіслати</button>
        </div>
    </form>
}   