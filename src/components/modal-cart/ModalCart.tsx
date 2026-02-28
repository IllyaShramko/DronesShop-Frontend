import { useCartContext } from "../../context"
import { ICONS } from "../../shared/icons"
import styles from "./modal-cart.module.css"
import { ModalCartProps } from "./modal-cart.types"
import { ModalProductsList } from "./products"

export function ModalCart(props: ModalCartProps) {
    const { isOpen, onClose } = props
    const {items, totalPrice, discountedPrice} = useCartContext()

    if (!isOpen) return null

    return <>
        <div className={styles.overlay} onClick={onClose}></div>
        <div className={styles.modal}>
            <button onClick={onClose} className={styles.closeButton}>
                <ICONS.CloseCross className={styles.closeIcon} />
            </button>
            <div className={styles.header}>
                <p className={`${styles.headerButton} ${styles.buttonActive}`}>Кошик</p>
            </div>
            <div className={styles.body}>
                <hr />
                <ModalProductsList/>
                {
                    items.length === 0 ? null
                    : <div>
                        <hr className={styles.line} />
                        <div className={styles.prices}>
                            <div className={styles.priceContainer}>
                                <p className={styles.namePrice}>Загальна сума</p>
                                <p className={styles.totalPrice}>{totalPrice()} ₴</p>
                            </div>
                            <div className={styles.priceContainer}>
                                <p className={styles.namePrice}>Загальна сума</p>
                                <p className={styles.howMuchDiscounted}>- {totalPrice() - discountedPrice()} ₴</p>
                            </div>
                            <div className={styles.priceContainer}>
                                <p className={styles.namePrice}>Загальна сума</p>
                                <p className={styles.discountPrice}>{discountedPrice()} ₴</p>
                            </div>
                        </div>
                    </div>
                }
                <hr />
                <div className={styles.buttonsBottom}>
                    <button onClick={onClose}>Продовжити покупки</button>
                </div>
            </div>
        </div>
    </>
}