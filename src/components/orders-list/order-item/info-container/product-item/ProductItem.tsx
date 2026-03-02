import { ProductItemProps } from "./product-item.types";
import styles from "./product-item.module.css"
export function ProductItem(props: ProductItemProps) {
    const {product} = props

    return <div className={styles.product}>
        <div className={styles.imgContainer}>
            <img src={product.product.previewPhoto} />
        </div>
        <div className={styles.nameContainer}>
            <p>{product.product.name}</p>
        </div>
        {product.product.discount !== 0
            ? <div className={styles.pricesContainer}>
                <p className={styles.priceDiscounted}>{product.product.price} ₴</p>
                <p className={styles.priceDiscount}>{product.product.price * (1 - product.product.discount / 100)} ₴</p>
            </div>
            : <div className={styles.pricesContainer}>
                <p>{product.product.price} ₴</p>
            </div>
        }
        <div className={styles.countContainer}>
            <p>{product.ordered}</p>
        </div>
        <div className={styles.sumPriceContainer}>
            <p>{product.product.price * (1 - product.product.discount / 100)}₴</p>
        </div>
    </div>
}