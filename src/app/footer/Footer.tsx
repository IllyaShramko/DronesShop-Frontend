import styles from "./footer.module.css"
import { ICONS } from "../../shared/icons"
import { IMAGES } from "../../shared/images"
import { Link } from "react-router-dom"

export function Footer() {
    return <footer className={styles.footer}>
			<div className = {styles.information}>
				<div className = {styles.infoBlock}>
					<h4>1K+</h4>
					<p>Успішних відправок</p>
				</div>
				<div className = {styles.infoBlock}>
					<h4>1.5K+</h4>
					<p>Задоволених клієнтів</p>
				</div>
				<div className = {styles.infoBlock}>
					<h4>24/7</h4>
					<p>Підтримка клієнтів</p>
				</div>
			</div>

			<img src = {IMAGES.bigLogo} alt="DRONES" />

			<div className = {styles.links}>
				<Link to = {"#"}>Каталог</Link>
				<Link to = {"/about"}>Про нас</Link>
				<Link to = {"/contacts"}>Контакти</Link>
				<Link to = {"/cart"}>Кошик</Link>
				<Link to = {"/cabinet"}>Кабінет</Link>
			</div>
            <div className = {styles.footerBottom}>
                <hr />
			    <p >© 2025 Drones Всі права захищені.</p>
            </div>
		</footer>
}