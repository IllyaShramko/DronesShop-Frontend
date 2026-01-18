import { useEffect } from "react";
import styles from "./home.module.css"
import { IMAGES } from "../../shared/images";
import { ICONS } from "../../shared/icons";

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
                
                    <p>Читати більше</p>
                    <ICONS.RightArrowBlack className={styles.arrowRight}/>
                                <div className={styles.newSection}>
                    <h2 className={styles.newTitle}>НОВЕ НА САЙТІ</h2>

                    
                    <div className={styles.cards}>

                      
                        <div className={`${styles.card} ${styles.cardGold}`}>
                        <img src="/images/drone1.jpg" className={styles.cardBg} />
                        <img src="/images/droneMain.png" className={styles.cardDrone} />

                        <div className={styles.cardContent}>
                            <h3>DJI Mini 4K</h3>
                            <p>Easy-To-Use Mini Camera Drone</p>

                            <div className={styles.cardBottom}>
                            <span>from to $299</span>
                            <button>Купити →</button>
                            </div>
                        </div>
                        </div>

                        
                        <div className={`${styles.card} ${styles.cardDark}`}>
                        <img src="/images/drone2.jpg" className={styles.cardBg} />
                        <img src="/images/droneMain.png" className={styles.cardDrone} />

                        <div className={styles.cardContent}>
                            <h3>DJI Mini 4Pro</h3>
                            <p>Easy-To-Use Mini Camera Drone</p>

                            <div className={styles.cardBottom}>
                            <span>from to $299</span>
                            <button>Купити →</button>
                            </div>
                        </div>
                        </div>

                     
                        <div className={`${styles.card} ${styles.cardBlue}`}>
                        <img src="/images/drone3.jpg" className={styles.cardBg} />
                        <img src="/images/droneMain.png" className={styles.cardDrone} />

                        <div className={styles.cardContent}>
                            <h3>DJI Mini 4K</h3>
                            <p>Easy-To-Use Mini Camera Drone</p>

                            <div className={styles.cardBottom}>
                            <span>from to $299</span>
                            <button>Купити →</button>
                            </div>
                        </div>
                        </div>

                    </div>
                    </div>

          
                   
                
            </div>
        </div>
    </div>
}