import styles from "./popular-list.module.css";
import { ICONS } from "../../shared/icons";
import { IMAGES } from "../../shared/images";
import { Link, useNavigate } from "react-router-dom";

export function PopularProducts() {
    
    return <div className={styles.popularCatalog}>
        <div className={styles.header}>
            <h1>Каталог</h1>
        </div>
        <div className={styles.cards}>
            <div className={styles.card}>
                <div className={styles.img}>
                    <img src={IMAGES.testDrone1} />
                </div>
                <div className={styles.information}>
                    <h2>DJI Mini 4K</h2>
                    <div className={styles.price}>
                        <p className={styles.priceDiscounted}>29 950 ₴</p>
                        <p className={styles.priceDiscount}>29 900 ₴</p>
                    </div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.img}>
                    <img src={IMAGES.testDrone2} />
                </div>
                <div className={styles.information}>
                    <h2>DJI Mini 4K</h2>
                    <div className={styles.price}>
                        <p>29 950 ₴</p>
                    </div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.img}>
                    <img src={IMAGES.testDrone3} />
                </div>
                <div className={styles.information}>
                    <h2>DJI Mini 4K</h2>
                    <div className={styles.price}>
                        <p>29 950 ₴</p>
                    </div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.img}>
                    <img src={IMAGES.testDrone1} />
                </div>
                <div className={styles.information}>
                    <h2>DJI Mini 4K</h2>
                    <div className={styles.price}>
                        <p>29 950 ₴</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.buttonDiv}>
            <Link to={"/catalog"} className={styles.btn}>
                <p>Дивитись всі</p>
                <ICONS.RightArrowWhite/>
            </Link>
        </div>
    </div>
}