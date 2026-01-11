import styles from "./footer.module.css"
import { ICONS } from "../../shared/icons"
import { IMAGES } from "../../shared/images"
import { Link } from "react-router-dom"

export function Footer() {
    return <footer className={styles.footer}>
        <div className={styles.containerInformation}>
            <svg viewBox="0 0 1440 296" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.footerBg}>
                <ellipse cx="755" cy="-122.023" rx="886.497" ry="417.628" transform="rotate(-180 740 -122)" fill="white" className={styles.footerEllipse}/>
            </svg>
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