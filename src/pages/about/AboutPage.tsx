import { IMAGES } from "../../shared/images";
import styles from "./about.module.css";

function AboutPage() {
    return (
        <section className={styles.about}>
            <h1>ПРО НАС</h1>
            <p>
                Ми — команда, яка об&apos;єднана спільною метою: зробити передові технології
                доступними для кожного, хто потребує точності, безпеки та інновацій.
                <br /><br />
                З 2022 року ми спеціалізуємось на постачанні дронів і тепловізорів
                для професійного, цивільного та волонтерського використання.
            </p>

            <div className={styles.aboutImage}>
                <img src={IMAGES.About1} alt="Про нас" />
                <div className={styles.fade}></div>
            </div>
        </section>

        <section className={styles.mission}>
            <div className={styles.text}>
                <h2>НАША МІСІЯ</h2>
                <p>
                    Допомагати тим, хто стоїть на передовій — у прямому й переносному сенсі.
                    Ми обираємо тільки надійну техніку, яку перевіряємо самі.
                    Наша мета — якість, простота і підтримка на кожному етапі.
                </p>
            </div>

            <div className={styles.image}>
                <img src={IMAGES.About2} alt="Наша місія" />
                <div className={styles.overlay}></div>
            </div>
        </section>

        <section className={styles.team}>
            <div className={styles.image}>
                <img src={IMAGES.About3} alt="Команда" />
                <div className={`${styles.overlay} ${styles.dark}`}></div>
            </div>

            <div className={styles.text}>
                <h2>КОМАНДА, ЯКІЙ МОЖНА ДОВІРЯТИ</h2>
                <p>
                    Ми — не просто магазин. Ми — фахівці, які самі працюють із цією технікою
                    й консультують з досвіду.
                    Засновники проєкту — волонтери, військові та IT-спеціалісти.
                </p>
            </div>
        </section>

        <section className={styles.stats}>
            <div className={styles.statsInner}>
                <div>
                    <h3>1K+</h3>
                    <p>Успішних відправок</p>
                </div>
                <div>
                    <h3>1.5K+</h3>
                    <p>Задоволених клієнтів</p>
                </div>
                <div>
                    <h3>24/7</h3>
                    <p>Підтримка клієнтів</p>
                </div>
            </div>
            <svg className={styles.wave} viewBox="0 0 1440 120" preserveAspectRatio="none">
                <path d="M0,0 A720,120 0 0 0 1440,0 L1440,120 L0,120 Z" />
            </svg>
        </section>
    );
}