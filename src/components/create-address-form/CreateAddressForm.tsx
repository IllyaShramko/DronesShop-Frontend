import { useForm } from "react-hook-form"
import { CreateAddressFormProps } from "./create-address-form.types"
import { useEffect } from "react"
import styles from "./create-address-form.module.css"
import { AddressCredentials } from "../../shared/api"
import { useCreateNewAddress } from "../../hooks/use-add-new-address"

export function CreateAddressForm(props: CreateAddressFormProps) {
    const {register, handleSubmit, formState, setError, reset} = useForm<AddressCredentials>()
    const [createNewAddress, {isLoading, error}] = useCreateNewAddress()
    const {setFormClose, refreshAddresses} = props

    async function onSubmit(data: AddressCredentials) {
        const responseData = await createNewAddress(data)
        if ("error" in responseData && responseData.error) {
            setError('root', {message: responseData.error})
        }
        setFormClose()
        reset(formState.defaultValues)
        await refreshAddresses()
    }
    
    useEffect( () => {
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
        <div>
            <h2>Додавання нової адреси</h2>
        </div>
        <div>
            <label className={styles.formField}>
                Місто:
                <input type="text" className={cityError && styles.errorInput} placeholder="Місто" {...register("city", {
                    required: {
                        value: true,
                        message: "Місто є обов'язковим полем"
                    }
                })} />
                <p className={styles.error}>{cityError?.message}</p>
            </label>
            
            <label className={styles.formField}>
                Вулиця:
                <input type="text" className={streetError && styles.errorInput} placeholder="Вулиця" {...register("street", {
                    required: {
                        value: true,
                        message: "Вулиця є обов'язковим полем"
                    }
                })} />
                <p className={styles.error}>{streetError?.message}</p>
            </label>
            
            <label className={styles.formField}>
                Будинок:
                <input type="number" className={houseNumberError && styles.errorInput} placeholder="Номер будинку" {...register("houseNumber", {
                    required: {
                        value: true,
                        message: "Номер будинку є обов'язковим полем"
                    }
                })} />
                <p className={styles.error}>{houseNumberError?.message}</p>
            </label>
            
            <label className={styles.formField}>
                Квартира:
                <input type="number" className={apartamentNumberError && styles.errorInput} placeholder="Номер квартири" {...register("apartamentNumber", {
                    required: {
                        value: true,
                        message: "Номер квартири є обов'язковим полем"
                    }
                })} />
                <p className={styles.error}>{apartamentNumberError?.message}</p>
            </label>
            <label className={styles.formField}>
                Під'їзд:
                <input type="number" className={entranceNumberError && styles.errorInput} placeholder="Номер під'їзду" {...register("entranceNumber", {
                    required: {
                        value: true,
                        message: "Номер під'їзду є обов'язковим полем"
                    }
                })} />
                <p className={styles.error}>{entranceNumberError?.message}</p>
            </label>
            <p className={styles.error}>{rootError?.message}</p>
        </div>
        <div>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>+ Додати адрес</button>
        </div>
    </form>
}   