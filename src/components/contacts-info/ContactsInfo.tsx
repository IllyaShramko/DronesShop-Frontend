import { Link } from "react-router-dom"
import { ICONS } from "../../shared/icons"
import styles from "./contacts-info.module.css"

export function ContactsInfo() {
    return <div className={styles.info}>
        <section>
            <h3 className={styles.title}>Наші контакти</h3>
        </section>
        <section>
            <div>
                <ICONS.Phone className={styles.icon}/>
                <p>+38 (067) 123-45-67</p>
            </div>
            <div>
                <ICONS.Mail className={styles.icon}/>
                <p>info@dronex.com.ua</p>
            </div>
            <div>
                <ICONS.PinMap className={styles.icon}/>
                <p>вул. Університетська, 22, м. Дніпро, 49000, Україна</p>
            </div>
            <div>
                <ICONS.Calendar className={styles.icon}/>
                <p>Пн–Пт: 10:00 — 18:00, Сб–Нд: вихідні</p>
            </div>
        </section>
        <section className={styles.social}>
            <h4 className={styles.socialTitle}>Ми в соцмережах:</h4>
            <div className={styles.socialIcons}>
                <Link to={"#"}><ICONS.Facebook className={styles.icon}/></Link>
                <Link to={"#"}><ICONS.Telegram className={styles.icon}/></Link>
                <Link to={"#"}><ICONS.Instagram className={styles.icon}/></Link>
            </div>
        </section>
    </div>
}