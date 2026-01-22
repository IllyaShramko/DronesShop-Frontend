import styles from "./new-list.module.css";
import { ICONS } from "../../shared/icons";
import { IMAGES } from "../../shared/images";

export function NewProducts() {

    return <div className={styles.newProducts}>
        <div className={styles.header}>
            <h1>Нове на сайті</h1>
        </div>
        <div className={styles.cards}>
            <div className={`${styles.card} ${styles.firstDrone}`} style={{"--gradColor": "#F5BE4F"} as React.CSSProperties}>
                <img src={IMAGES.testDrone1} className={styles.imgDrone}/>
                <div className={styles.information}>
                    <div className={styles.nameDesc}>
                        <h2>DJI Mini 4K</h2>
                        <p>Easy-To-Use Mini Camera Drone</p>
                    </div>
                    <div className={styles.bottomCard}>
                        <h3>from to $299</h3>
                        <button>
                            <p>Купити</p>
                            <ICONS.RightArrowWhite/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${styles.card} ${styles.secondDrone}`} style={{"--gradColor": "#1A271B"} as React.CSSProperties}>
                <img src={IMAGES.testDrone2} className={styles.imgDrone}/>
                <div className={styles.information}>
                    <div className={styles.nameDesc}>
                        <h2>DJI Mini 4K</h2>
                        <p>Easy-To-Use Mini Camera Drone</p>
                    </div>
                    <div className={styles.bottomCard}>
                        <h3>from to $299</h3>
                        <button>
                            <p>Купити</p>
                            <ICONS.RightArrowWhite/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${styles.card} ${styles.thirdDrone}`} style={{"--gradColor": "#4F94A4"} as React.CSSProperties}>
                <img src={IMAGES.testDrone3} className={styles.imgDrone}/>
                <div className={styles.information}>
                    <div className={styles.nameDesc}>
                        <h2>DJI Mini 4K</h2>
                        <p>Easy-To-Use Mini Camera Drone</p>
                    </div>
                    <div className={styles.bottomCard}>
                        <h3>from to $299</h3>
                        <button>
                            <p>Купити</p>
                            <ICONS.RightArrowWhite/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
