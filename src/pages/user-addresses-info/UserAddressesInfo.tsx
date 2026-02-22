import styles from "./user-addresses.module.css"
import { useGetMyAddresses } from "../../hooks"
import { ICONS } from "../../shared/icons"
import { useEffect, useState } from "react"
import { CreateAddressForm, EditAddressForm } from "../../components"
import { useGoHead } from "../../shared/hooks"
import { Address } from "../../shared/types"

export function UserAddressesInfoPage() {
    const [getAddresses, {error, isLoading}] = useGetMyAddresses()
    const [isCreateFormOpened, setOpenCreateForm] = useState<boolean>(false)
    const [whichAddressIsOpened, setWhichAddressIsOpened] = useState<number | null>(null)
    const [addresses, setAddresses] = useState<Address[]>([])
    const goHead = useGoHead()
    useEffect(() => {
        goHead()
        async function getAddressesAsync() {
            const gettedAddresses = await getAddresses()
            if ("error" in gettedAddresses) {
                setAddresses([])
                return
            }
            setAddresses(gettedAddresses)
        }
        getAddressesAsync()
    }, [])

    async function refreshAddresses() {
        const gettedAddresses = await getAddresses()
        if ("error" in gettedAddresses) {
            setAddresses([])
            return
        }
        setAddresses(gettedAddresses)
        return
    } 

    function closeCreateForm() {
        setOpenCreateForm(false)
        return 
    }

    if (isLoading) {
        return <div className={styles.contactInfo}>
            <h2>Контактні дані</h2>
            <div className={styles.addressesContainer}>
                <h3>Завантаження...</h3>
            </div>
        </div>
    }
    if (error) {
        return <div className={styles.contactInfo}>
            <h2>Контактні дані</h2>
            <div className={styles.addressesContainer}>
                <h3>Невдалося завантажити ващі адреса. Спробуйте пізніще</h3>
            </div>
        </div>
    }
    return <div className={styles.addressesInfo}>
        <h2>Адреса доставки</h2>
        <div className={styles.addressesContainer}>
            {addresses.length === 0
                ? <h3>У вас поки що немає адрес...</h3>
                : addresses.map((address, index) => {
                    return <div key={index} className={styles.address}>
                        <div className={styles.header}>
                            <div>
                                <input type="radio" name="selectedAddress" />
                                <h4 className={styles.addressName}>{address.city}, {address.street}</h4>
                            </div>
                            <button
                                className={`${styles.editButton} ${whichAddressIsOpened === index && styles.editDisabledButton}`.trim()}
                                onClick={() => setWhichAddressIsOpened(index)}
                                disabled={whichAddressIsOpened === index}
                            >
                                <ICONS.Edit className={styles.editIcon} />
                            </button>
                        </div>
                        {whichAddressIsOpened === index && (
                            <EditAddressForm
                                address={address}
                                setFormClose={() => setWhichAddressIsOpened(null)}
                                refreshAddresses={refreshAddresses}
                            />
                        )}
                    </div>
                })
            }
            <div>
                {
                    isCreateFormOpened
                    ? <CreateAddressForm
                        setFormClose={closeCreateForm}
                        refreshAddresses={refreshAddresses}
                    />
                    : <button className={styles.createButton} onClick={()=>{setOpenCreateForm(true)}}>
                        + Додати адресу
                    </button>
                }
            </div>
        </div>
    </div>
}