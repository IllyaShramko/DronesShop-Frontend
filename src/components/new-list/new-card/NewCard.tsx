import { useNavigate } from "react-router-dom";
import { ICONS } from "../../../shared/icons";
import styles from "./new-card.module.css"
import { NewCardProps } from "./new-card.types";
import { useFormatNumber } from "../../../shared/hooks/use-format-number";

export function NewCard({product, subclass, color}: NewCardProps) {
    const navigate = useNavigate()
    const formatNum = useFormatNumber()
    return <div className={`${styles.card} ${styles[subclass]}`} style={{"--gradColor": color} as React.CSSProperties}>
        <img src={product.previewPhoto} className={styles.imgDrone}/>
        <div className={styles.information}>
            <div className={styles.nameDesc}>
                <h2>{product.name}</h2>
                <p>
                    {product.description.length > 80 
                    ? product.description.slice(0, 80) + "..." 
                    : product.description}
                </p>
            </div>
            <div className={styles.bottomCard}>
                <h3>from to {formatNum(product.price * (1 - product.discount / 100))} ₴</h3>
                <button onClick={() => navigate(`/products/${product.id}`)}>
                    <p>Купити</p>
                    <ICONS.RightArrowWhite/>
                </button>
            </div>
        </div>
    </div>
}