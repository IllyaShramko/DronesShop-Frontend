import styles from "./footer.module.css"
import { IMAGES } from "../../../shared/images"
import { Link } from "react-router-dom"

export function AnotherFooter() {
    return <footer className={styles.footer}>
			<img src = {IMAGES.bigLogo} alt="DRONES" />

            <div className = {styles.footerBottom}>
                <hr />
			    <p >© 2025 Drones Всі права захищені.</p>
            </div>
		</footer>
}