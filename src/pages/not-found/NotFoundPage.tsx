import { IMAGES } from "../../shared/images";
import styles from "./not-found.module.css";

function NotFoundPage() {
    return (
        <div className={styles.container}>
            <img src={IMAGES.Error} alt="Error" className={styles.image} />
            <p className={styles.text}>Сторінку не знайдено!</p>
        </div>
    );
}