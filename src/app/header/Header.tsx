import styles from "./header.module.css"
import { ICONS } from "../../shared/icons"
import { IMAGES } from "../../shared/images"
import { Link } from "react-router-dom"

export function Header() {
    return <header className={styles.header}>
        <nav className={styles.navigation}>
            <Link to={"/catalog"}>Каталог</Link>
            <Link to={"/about"}>Про нас</Link>
            <Link to={"#"}>Контакти</Link>
        </nav>
        <Link to={"/"} className={styles.logoContainer}>
            <img src={IMAGES.Logo} alt="" />
        </Link>
        <div className={styles.actionsUser}>
            <div className={styles.actionIcon}>
                <ICONS.Purchases/>
            </div>
            <div className={styles.actionIcon}>
                <ICONS.User/>
            </div>
        </div>
        <div className={styles.background}></div>
    </header>
}