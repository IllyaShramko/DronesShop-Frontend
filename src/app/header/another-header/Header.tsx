import styles from "./header.module.css"
import { IMAGES } from "../../../shared/images"
import { Link } from "react-router-dom"

export function AnotherHeader() {
    return <header className={styles.header}>
        <nav className={styles.navigation}>
            <Link to={"/catalog"}>Продовжити покупки</Link>
        </nav>
        <Link to={"/"} className={styles.logoContainer}>
            <img src={IMAGES.Logo} alt="" />
        </Link>
        <div className={styles.actionsUser}>

        </div>
        <div className={styles.background}></div>
    </header>
}