import { useForm } from "react-hook-form"
import styles from "./user-contact.module.css"
import { useEffect } from "react"
import { UserInformationEditCredentials } from "../../shared/api"
import { useEditUserInfo } from "../../hooks"
import { useUserContext } from "../../context"
import { useGoHead } from "../../shared/hooks"


export function UserContactInfoPage() {
    const {register, handleSubmit, formState, setError, reset} = useForm<UserInformationEditCredentials>()
    const [editUserInfo, {isLoading, error}] = useEditUserInfo()
    const {user} = useUserContext()
    const goHead = useGoHead()
    useEffect(() => {
        goHead()
    }, [])
    
    async function onSubmit(data: UserInformationEditCredentials) {
        console.log("Form sended:", data)
        const responseData = await editUserInfo(data)
        if ("error" in responseData && responseData.error) {
            setError('root', {message: responseData.error})
        } 
        reset({
            firstName: data.firstName,
            lastName: data.lastName ?? "",
            patronymic: data.patronymic ?? "",
            phoneNumber: data.phoneNumber ?? "",
            email: data.email
        })
        
    }
    
    useEffect(() => {
        if (!error) return
        setError('root', {message: error})
    } , [error])
    
    useEffect(() => {
        if (!user) return
        reset({
            firstName: user.firstName,
            lastName: user.lastName ?? '',
            patronymic: user.patronymic ?? '',
            phoneNumber: user.phoneNumber ?? '',
            email: user.email
        })
    }, [user, reset])
    
    const firstNameError = formState.errors.firstName
    const lastNameError = formState.errors.lastName
    const patronymicError = formState.errors.patronymic
    const phoneNumberError = formState.errors.phoneNumber
    const emailError = formState.errors.email
    const rootError = formState.errors.root

    return <div className={styles.contactInfo}>
        <h2>Контактні дані</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label className={styles.formField}>
                Прізвище
                <input type="text" id="lastName" defaultValue={user?.lastName} placeholder="Ваше Призвіще" {...register("lastName", {
                    required: false
                })} />
                <p className={styles.error}>{lastNameError?.message}</p>
            </label>
            <label className={styles.formField}>
                Ім'я
                <input type="text" id="firstName" defaultValue={user?.firstName} placeholder="Ваше Ім'я" {...register("firstName", {
                    required: {
                        value: true,
                        message: "Ім'я є обов'язковим полем"
                    },
                })} />
                <p className={styles.error}>{firstNameError?.message}</p>
            </label>
            <label className={styles.formField}>
                По батькові
                <input type="text" id="patronymic" defaultValue={user?.patronymic} placeholder="По батькові" {...register("patronymic", {
                    required: false
                })} />
                <p className={styles.error}>{patronymicError?.message}</p>
            </label>
            <label className={styles.formField}>
                Номер телефону
                <input type="tel" id="phoneNumber" defaultValue={user?.phoneNumber} placeholder="+ 38 0" {...register("phoneNumber", {
                    required: false
                })} />
                <p className={styles.error}>{phoneNumberError?.message}</p>
            </label>
            <label className={styles.formField}>
                Email
                <input type="email" id="email" defaultValue={user?.email} placeholder="Ваше Email" {...register("email", {
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
            {rootError && <p className={styles.rootError}>{rootError.message}</p>}
            <button type="submit" className={`${styles.submitButton} ${isLoading && styles.loadingButton}`} disabled={isLoading}>{isLoading ? "Збереження..." : "Зберегти зміни"}</button>
        </form>
    </div>
}