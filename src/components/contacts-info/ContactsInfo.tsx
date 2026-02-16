import { Link } from "react-router-dom"
import { ICONS } from "../../shared/icons"
import styles from "./contacts-info.module.css"

export function ContactsInfo() {
    return <div className={styles.info}>
        <div>
            <h3 className={styles.title}>Наші контакти</h3>
        </div>
        <div>
            <div>
                <ICONS.Phone/>
                <p>+38 (067) 123-45-67</p>
            </div>
            <div>
                <ICONS.Mail/>
                <p>info@dronex.com.ua</p>
            </div>
            <div>
                <ICONS.PinMap/>
                <p>вул. Університетська, 22, м. Дніпро, 49000, Україна</p>
            </div>
            <div>
                <ICONS.Calendar/>
                <p>Пн–Пт: 10:00 — 18:00, Сб–Нд: вихідні</p>
            </div>
        </div>
        <div>
            <h4 className={styles.socialTitle}>Ми в соціальних мережах</h4>
            <div className={styles.socialIcons}>
                <Link to={"#"}><ICONS.Facebook/></Link>
                <Link to={"#"}><ICONS.Telegram/></Link>
                <Link to={"#"}><ICONS.Instagram/></Link>
            </div>
        </div>
    </div>
}