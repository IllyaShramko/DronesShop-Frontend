import styles from "./popular-card.module.css"
import { PopularCardProps } from "./popular-card.types";

export function PopularCard({product}: PopularCardProps) {
    return <div className={styles.card}>
        <div className={styles.img}>
            <img src={product.previewPhoto} />
        </div>
        <div className={styles.information}>
            <h2>{product.name}</h2>
            {product.discount != 0
                ? <div className={styles.price}>
                    <p className={styles.priceDiscounted}>{product.price} ₴</p>
                    <p className={styles.priceDiscount}>{product.price * (1 - product.discount / 100)} ₴</p>
                </div>
                : <div className={styles.price}>
                    <p>{product.price} ₴</p>
                </div>
            }
        </div>
    </div>
}