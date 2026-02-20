import { Link, Outlet, useNavigate } from "react-router-dom";
import styles from "./cabinet-layout.module.css"
import { useUserContext } from "../../context";

export function CabinetLayout() {
    const {logout, user, token} = useUserContext()
    const navigate = useNavigate()

    if (!user || !token) {
        navigate("/")
        return null
    }
    return <div className={styles.container}>
        <aside className={styles.sidebar}>
            <h1>Особистий кабінет</h1>
            <Link className={`${styles.sideButton} cabinet-link`} to="/cabinet">Контактні дані</Link>
            <Link className={`${styles.sideButton} orders-link`} to="/cabinet/orders">Мої замовлення</Link>
            <Link className={`${styles.sideButton} addresses-link`} to="/cabinet/addresses">Адреса доставки</Link>
            <hr className={styles.line}/>
            <div>
                <button className={styles.sideButton} onClick={() => {
                    logout()
                    navigate("/")
                }}>Вийти</button>
            </div>
        </aside>
        <main className={styles.main}>
            <Outlet/>
        </main>
    </div>
}