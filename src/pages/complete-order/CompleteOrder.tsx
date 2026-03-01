import { useEffect } from "react";
import styles from "./complete-oreder.module.css"
import { useGoHead } from "../../shared/hooks";
import { Link } from "react-router-dom";

export function CompleteOrder() {
    const goHead = useGoHead()

    useEffect(() => {
        goHead()
        document.body.style.backgroundColor = '#CDD5DD';
        return () => {
            document.body.style.backgroundColor = '#ffffff';
        };
    }, []);

    return <div className={styles.page}>
        <h1>Успіх!</h1>
        <div className={styles.text}>
            <p>Ваше замовлення №1 прийнято та відправлено на обробку.</p>
            <p></p>
            <p>
                <p>Ми сповістимо Вас щойно замовлення буде відправлено.</p>
                <p>Дякуємо за довіру</p>
            </p>
        </div>
        <Link to={"/"} className={styles.submitButton}>
            На головну
        </Link>
    </div>
}