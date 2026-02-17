import { IMAGES } from "../../shared/images";
import styles from "./not-found.module.css";
import { useEffect } from "react";
import { useGoHead } from "../../shared/hooks";

export function NotFoundPage() {
    const goHead = useGoHead()

    useEffect(() => {
        goHead()
    }, [])
    return (
        <div className={styles.container}>
            <img src={IMAGES.Error} alt="Error" className={styles.image} />
            <p className={styles.text}>Сторінку не знайдено!</p>
        </div>
    );
}