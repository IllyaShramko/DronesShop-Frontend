import { Link, Outlet } from "react-router-dom";
import styles from "./cabinet-layout.module.css"

export function CabinetLayout() {
    return <div className={styles.container}>
        <aside className={styles.sidebar}>
            <nav>
                <Link className={`${styles.sideButton} cabinet-link`} to="/cabinet">Контактні дані</Link>
                <Link className={`${styles.sideButton} orders-link`} to="/cabinet/orders">Мої замовлення</Link>
                <Link className={`${styles.sideButton} addresses-link`} to="/cabinet/addresses">Адреса доставки</Link>
            </nav>
            <div className={styles.line}></div>
            <div>
                <button className={styles.sideButton}>Вийти</button>
            </div>
        </aside>
        <main className={styles.main}>
            <Outlet/>
        </main>
    </div>
}