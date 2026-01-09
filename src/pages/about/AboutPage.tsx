import { IMAGES } from "../../shared/images"
import styles from "./about.module.css"

export function AboutPage() {
    return <div className={styles.aboutPage}>
        <div className={styles.shortInfo}>
            <div className={styles.textBlock1}>
                <h1>Про нас</h1>
                <div>
                    <p>З 2022 року ми спеціалізуємось на постачанні дронів і тепловізорів для професійного, цивільного та волонтерського використання.</p>
                    <p>Ми — команда, яка об'єднана спільною метою: зробити передові технології доступними для кожного, хто потребує точності, безпеки та інновацій.</p>
                </div>
            </div>
            <div className={styles.imageBlock}>
                <img className={styles.about1} src={IMAGES.About1} alt="About Us" />
            </div>
        </div>
        <div className={styles.detailedInfo}>
            <div className={styles.textBlock}>
                <h2>Наша місія</h2>
                <div>
                    <p>Допомагати тим, хто стоїть на передовій — у прямому й переносному сенсі.</p>
                    <p>Ми обираємо тільки надійну техніку, яку перевіряємо самі. Наша мета — якість, простота, і підтримка на кожному етапі: від покупки до використання.</p>
                </div>
            </div>
            <div className={styles.imageBlock}>
                <img className={styles.about2} src={IMAGES.About2} alt="About Us" />
            </div>
        </div>
        <div className={`${styles.detailedInfo} ${styles.reverse}`}>
            <div className={styles.textBlock}>
                <h2>Команда, якій можна довіряти</h2>
                <div>
                    <p>Ми — не просто магазин. Ми — фахівці, які самі працюють із цією технікою й консультують з досвіду. Засновники проєкту — волонтери, військові та IT-спеціалісти, які об'єднали зусилля задля важливої справи.</p>
                </div>
            </div>
            <div className={styles.imageBlock}>
                <img className={styles.about3} src={IMAGES.About3} alt="About Us" />
            </div>
        </div>
    </div>
}