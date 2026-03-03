import { ICONS } from "../../../shared/icons";
import styles from "./products.module.css"
import { useCartContext } from "../../../context";
import { useFormatNumber } from "../../../shared/hooks/use-format-number";

export function ModalProductsList() {
    const {items, decrementCount, incrementCount, removeFromCart} = useCartContext()
    const formatNum = useFormatNumber()

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
                                        <p className={styles.priceDiscounted}>{formatNum(product.price)} ₴</p>
                                        <p className={styles.priceDiscount}>{formatNum(product.price * (1 - product.discount / 100))} ₴</p>
                                    </div>
                                    : <div className={styles.price}>
                                        <p>{formatNum(product.price)} ₴</p>
                                    </div>
                                }
                            </div>
                            <div className={styles.countAndControlers}>
                                <button onClick={()=>{decrementCount(product.id)}}>-</button>
                                <p>{product.count}</p>
                                <button onClick={()=>{incrementCount(product.id)}}>+</button>
                            </div>
                            <div className={styles.binContainer}>
                                <button onClick={()=>{removeFromCart(product.id)}}>
                                    <ICONS.Bin />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            })
        }
    </div>
}