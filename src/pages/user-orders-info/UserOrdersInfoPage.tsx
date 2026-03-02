import { OrdersList } from "../../components"
import styles from "./user-orders.module.css"

export function UserOrdersInfoPage() {
    
    return <div className={styles.page}>
        <h2>Мої замовлення</h2>
        <OrdersList />
    </div>
}