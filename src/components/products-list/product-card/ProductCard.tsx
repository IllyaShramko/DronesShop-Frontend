import styles from './product-card.module.css'
import { ProductCardProps } from "./product-card.types"
import { Link, useNavigate } from "react-router-dom"

export function ProductCard(props: ProductCardProps) {
    const {product} = props
    
    return <Link to={`/products/${product.id}`} className={styles.product}>
        <div className={styles.imageContainer}>
            <img className={styles.productImage} src={product.previewPhoto}/>
        </div>
        <div className={styles.infoProduct}>
            <p className={styles.title}>{product.name}</p>
            {product.discount != 0
                ? <div className={styles.price}>
                    <p className={styles.priceDiscounted}>{product.price} ₴</p>
                    <p className={styles.priceDiscount}>{product.price * (1 - product.discount / 100)} ₴</p>
                </div>
                : <div className={styles.price}>
                    <p>29 950 ₴</p>
                </div>
            }
        </div>
    </Link>
}