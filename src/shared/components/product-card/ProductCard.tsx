import { useEffect, useState } from 'react'
import { useCartContext } from '../../../context'
import { ICONS } from '../../icons'
import styles from './product-card.module.css'
import { ProductCardProps } from "./product-card.types"
import { useNavigate } from "react-router-dom"
import { useFormatNumber } from '../../hooks/use-format-number'

export function ProductCard(props: ProductCardProps) {
    const {product, subclass} = props
    const {addToCart} = useCartContext()
    const navigate = useNavigate()
    const [spawn, setSpawn] = useState<boolean>(false)
    const formatNum = useFormatNumber()
    function clickButton(action: string) {
        if (action === "buy") {
            addToCart(product)
        } else if (action === "navigate") {
            navigate(`/products/${product.id}`)
        }
    }
    useEffect(() => {
        setSpawn(true)
    }, [])

    return <div onClick={() => {clickButton("navigate")}} className={`${spawn && styles.productSpawn} ${styles.product} ${subclass}`}>
        <div className={styles.imageContainer}>
            <img className={styles.productImage} src={product.previewPhoto}/>
        </div>
        <div className={styles.infoProduct}>
            <p className={styles.title}>{product.name}</p>
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
        <button className={styles.buyButton} onClick={event => {
            event.stopPropagation()
            clickButton("buy")
        }}>
            <ICONS.PurchasesBlack className={styles.buyIcon} />
        </button>
    </div>
}