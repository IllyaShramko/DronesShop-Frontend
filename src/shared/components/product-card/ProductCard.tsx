import { useCartContext } from '../../../context'
import { ICONS } from '../../icons'
import styles from './product-card.module.css'
import { ProductCardProps } from "./product-card.types"
import { Link, useNavigate } from "react-router-dom"

export function ProductCard(props: ProductCardProps) {
    const {product, subclass} = props
    const {addToCart} = useCartContext()
    const navigate = useNavigate()
    function clickButton(action: string) {
        if (action === "buy") {
            addToCart(product)
        } else if (action === "navigate") {
            navigate(`/products/${product.id}`)
        }
    }

    return <div onClick={() => {clickButton("navigate")}} className={`${styles.product} ${subclass}`}>
        <div className={styles.imageContainer}>
            <img className={styles.productImage} src={product.previewPhoto}/>
        </div>
        <div className={styles.infoProduct}>
            <p className={styles.title}>{product.name}</p>
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
        <button className={styles.buyButton} onClick={event => {
            event.stopPropagation()
            clickButton("buy")
        }}>
            <ICONS.PurchasesBlack className={styles.buyIcon} />
        </button>
    </div>
}