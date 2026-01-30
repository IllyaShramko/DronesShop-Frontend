import { ICONS } from "../../shared/icons"
import styles from "./small-actions.module.css"
import { SmallActionsProductProps } from "./small-actions.types"

export function SmallActionsProduct({product}: SmallActionsProductProps) {
    return <div className={styles.mainBlock}>
        <div className={styles.textsProps}>
            <div className={styles.smallImageContainer}>
                <img src={product.previewPhoto} className={styles.smallImage}/>
            </div>
            <div className={styles.actionsInfo}>
                <div>
                    <h3>{product.name}</h3>
                </div>
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
        <div className={styles.btnContainer}>
            <button className={styles.purchasesContainer}>
                <ICONS.PurchasesBlack className={styles.purchasesImg}/>
            </button>
            <button className={styles.goToBuyContainer}>
                <p>Замовити</p>
                <ICONS.RightArrowWhite/>
            </button>
        </div>
    </div>
}