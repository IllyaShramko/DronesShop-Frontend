import styles from "./footer.module.css"
import { ICONS } from "../../shared/icons"
import { IMAGES } from "../../shared/images"
import { Link } from "react-router-dom"

export function Footer() {
    return <footer className={styles.footer}>
        <div className={styles.containerInformation}>
            <div className={styles.semiCircle}></div>
            <div className={styles.information}>
                <div className={styles.infoBlock}>
                    <h3 className={styles.infoNum}>0</h3>
                    <p className={styles.infoText}>Успішних відправок</p>
                </div>
                <div className={styles.infoBlock}>
                    <h3 className={styles.infoNum}>0</h3>
                    <p className={styles.infoText}>Задоволених клієнтів</p>
                </div>
                <div className={styles.infoBlock}>
                    <h3 className={styles.infoNum}>24/7</h3>
                    <p className={styles.infoText}>Підтримка клієнтів</p>
                </div>
            </div>
        </div>
        <img src={IMAGES.bigLogo} className={styles.logo} />
        <div className={styles.wrapper}>
            <div className={styles.containerLinks}>
                <Link to={"#"}>Каталог</Link>
                <Link to={"#"}>Про нас</Link>
                <Link to={"#"}>Контакти</Link>
                <Link to={"#"}>Кошик</Link>
                <Link to={"#"}>Кабінет</Link>
            </div>
            <div className={styles.containerCopyright}>
                <hr />
                <p>© 2024 Drones Shop. Всі права захищені.</p>
            </div>
        </div>
    </footer>
}