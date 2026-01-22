import { useEffect } from "react";
import styles from "./home.module.css"
import { IMAGES } from "../../shared/images";
import { ICONS } from "../../shared/icons";
import { NewProducts } from "../../components/new-list" 
import { PopularProducts } from "../../components/popular-list"
export function HomePage() {
    useEffect(() => {
        document.body.style.backgroundColor = '#CDD5DD';
        return () => {
            document.body.style.backgroundColor = '#ffffff';
        };
    }, []);
    return <div className={styles.homePage}>
        <div className={styles.headerHome}>
            <div className={styles.texts}>
                <h1>Технології</h1>
                <h1>Які змінюють реальність</h1>
            </div>
            <div className={styles.imageContainer}>
                <img src={IMAGES.DroneMain} className={styles.image}/>
            </div>
            <div className={styles.bottomHeader}>
                <div className={styles.description}>
                    <div className={styles.textsP}>
                        <p>Передові технології в одному місці.</p>
                        <p>Обирай найкраще для найважливішого.</p>
                    </div>
                    <div className={styles.btnContainer}>
                        <button>До каталогу</button>
                    </div>
                </div>
                <div className={styles.bottomBackground}></div>
            </div>
        </div>
        <div className={styles.mainHome}>
            <div className={styles.headerMain}>
                <h1>Про нас</h1>
                <div>
                    <p>Ми — команда, що об'єднує технології та надійність.</p>
                    <p>Пропонуємо дрони й тепловізори, перевірені у найскладніших умовах.</p>
                    <p>Обираємо тільки те, чому довіряємо самі.</p>
                </div>
                <button>
                    <p>Читати більше</p>
                    <ICONS.RightArrowBlack className={styles.arrowRight}/>
                </button>
            </div>
            <NewProducts></NewProducts>
            <PopularProducts></PopularProducts>
        </div>
    </div>
}