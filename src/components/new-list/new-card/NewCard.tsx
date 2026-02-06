import { ICONS } from "../../../shared/icons";
import styles from "./new-card.module.css"
import { NewCardProps } from "./new-card.types";

export function NewCard({product, subclass, color}: NewCardProps) {
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
                <h3>from to {product.price * (1 - product.discount / 100)} ₴</h3>
                <button>
                    <p>Купити</p>
                    <ICONS.RightArrowWhite/>
                </button>
            </div>
        </div>
    </div>
}