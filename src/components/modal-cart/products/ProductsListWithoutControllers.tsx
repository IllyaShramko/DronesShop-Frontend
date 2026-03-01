import styles from "./products.module.css"
import { useCartContext } from "../../../context";

export function ProductsListWithoutControllers() {
    const {items} = useCartContext()
    return <div className={styles.products}>
        {
            items.length === 0
            ? <div className={styles.noProductsText}>
                <p>Ваш кошик порожній</p>
                <p>Почніть вибирати товари, щоб вони з'явилися тут</p>
            </div>
            : items.map((product, index) => {
                return <>
                    {index !== 0 && <hr className={styles.hr} />}
                    <div className={styles.product}>
                        <div className={styles.imageContainer}>
                            <img src={product.previewPhoto} />                                
                        </div>
                        <div className={styles.mainInfo}>
                            <div className={styles.nameAndPrices}>
                                <h3>{product.name}</h3>
                                {product.discount !== 0
                                    ? <div className={styles.price}>
                                        <p className={styles.priceDiscounted}>{product.price} ₴</p>
                                        <p className={styles.priceDiscount}>{product.price * (1 - product.discount / 100)} ₴</p>
                                    </div>
                                    : <div className={styles.price}>
                                        <p>{product.price} ₴</p>
                                    </div>
                                }
                            </div>
                            <div className={styles.countAndControlers}>
                                <p className={styles.disabled}>{product.count}</p>
                            </div>
                        </div>
                    </div>
                </>
            })
        }
    </div>
}