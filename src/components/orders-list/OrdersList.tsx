import { useEffect, useState } from "react"
import { useGetMyOrders } from "../../hooks"
import styles from "./orders-list.module.css"
import { OrderWithTrackingInfo } from "../../shared/types"
import { OrderItem } from "./order-item"

export function OrdersList() {
    const [orders, setOrders] = useState<OrderWithTrackingInfo[]>([])
    const [getMyOrders, {error, isLoading}] = useGetMyOrders()
    const [whichOpened, setWhichOpened] = useState<number | null>(null)
    useEffect(() => {
        async function getMyOrdersAsync() {
            const gettedAddresses = await getMyOrders()
            if ("error" in gettedAddresses) {
                setOrders([])
                return
            }
            setOrders(gettedAddresses)
        }
        getMyOrdersAsync()
    }, [])

    async function refreshOrders() {
        const gettedOrders = await getMyOrders()
        if ("error" in gettedOrders) {
            setOrders([])
            return
        }
        setWhichOpened(null)
        setOrders(gettedOrders)
        return
    } 

    if (isLoading) {
        return <div className={styles.container}>
            <h3 className={styles.loadingText}>Завантаження<span className={styles.dots}></span></h3>
        </div>
    } else if (orders.length === 0) {
        return <div className={styles.container}>
            <h3>У вас поки що немає заказів...</h3>
        </div>
    }
    if (error) {
        return <div className={styles.container}>
            <h3 className={styles.error}>Невдалося завантажити ващі адреса. Спробуйте пізніще</h3>
        </div>
    }

    return <div className={styles.container}>
        {orders.map((order, index) => {
            return <OrderItem 
                order={order}
                setwhichOpened={setWhichOpened}
                whichOpened={whichOpened}
                index={index}
                key={order.id}
                refreshOrders={refreshOrders}
            />
        })}
    </div>  
}