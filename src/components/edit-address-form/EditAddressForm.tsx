import { useForm } from "react-hook-form"
import { EditAddressFormProps } from "./edit-address-form.types"
import { useEffect } from "react"
import { EditAddressCredentials } from "../../shared/api"
import { useCreateNewAddress, useEditAddress } from "../../hooks"
import styles from "./edit-address-form.module.css"

export function EditAddressForm(props: EditAddressFormProps) {
    const {register, handleSubmit, formState, setError, reset} = useForm<EditAddressCredentials>()
    const [editAddress, {isLoading, error}] = useEditAddress()
    const {setFormClose, address} = props

    async function onSubmit(data: EditAddressCredentials) {
        const responseData = await editAddress(data)
        if ("error" in responseData && responseData.error) {
            setError('root', {message: responseData.error})
        }
        setFormClose()
        reset(formState.defaultValues)
    }
    
    useEffect(() => {
        if (!error) return
        setError('root', {message: error})
    } , [error])
    
    const cityError = formState.errors.city
    const streetError = formState.errors.street
    const houseNumberError = formState.errors.houseNumber
    const entranceNumberError = formState.errors.entranceNumber
    const apartamentNumberError = formState.errors.apartamentNumber
    const rootError = formState.errors.root

    return <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" defaultValue={address.id} value={address.id} {...register("id")} />
        <label className={styles.formField}>
            Місто:
            <input type="text" defaultValue={address.city} className={cityError && styles.errorInput} placeholder="Місто" {...register("city", {
                required: {
                    value: true,
                    message: "Місто є обов'язковим полем"
                }
            })} />
            <p className={styles.error}>{cityError?.message}</p>
        </label>
        
        <label className={styles.formField}>
            Вулиця:
            <input type="text" defaultValue={address.street} className={streetError && styles.errorInput} placeholder="Вулиця" {...register("street", {
                required: {
                    value: true,
                    message: "Вулиця є обов'язковим полем"
                }
            })} />
            <p className={styles.error}>{streetError?.message}</p>
        </label>
        
        <label className={styles.formField}>
            Будинок:
            <input type="number" defaultValue={address.houseNumber} className={houseNumberError && styles.errorInput} placeholder="Номер будинку" {...register("houseNumber", {
                required: {
                    value: true,
                    message: "Номер будинку є обов'язковим полем"
                }
            })} />
            <p className={styles.error}>{houseNumberError?.message}</p>
        </label>
        
        <label className={styles.formField}>
            Квартира:
            <input type="number" defaultValue={address.apartamentNumber} className={apartamentNumberError && styles.errorInput} placeholder="Номер квартири" {...register("apartamentNumber", {
                required: {
                    value: true,
                    message: "Номер квартири є обов'язковим полем"
                }
            })} />
            <p className={styles.error}>{apartamentNumberError?.message}</p>
        </label>
        <label className={styles.formField}>
            Під'їзд:
            <input type="number" defaultValue={address.entranceNumber} className={entranceNumberError && styles.errorInput} placeholder="Номер під'їзду" {...register("entranceNumber", {
                required: {
                    value: true,
                    message: "Номер під'їзду є обов'язковим полем"
                }
            })} />
            <p className={styles.error}>{entranceNumberError?.message}</p>
        </label>
        <p className={styles.error}>{rootError?.message}</p>
        <div>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>Зберегти зміни</button>
        </div>
    </form>
}   