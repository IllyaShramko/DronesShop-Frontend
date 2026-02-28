import styles from "./new-list.module.css";
import { ICONS } from "../../shared/icons";
import { IMAGES } from "../../shared/images";
import { useGetNewProducts } from "../../hooks";
import { NewCard } from "./new-card/NewCard";

export function NewProducts() {
    const {products, isLoading, error} = useGetNewProducts({limit: 3, offset: 0})
    const colors = ["#F5BE4F", "#1A271B", "#4F94A4"]
    const classes = ["firstDrone", "secondDrone", "thirdDrone"]
    return <div className={styles.newProducts}>
        <div className={styles.header}>
            <h1>Нове на сайті</h1>
        </div>
        <div className={styles.cards}>
            {
                isLoading 
                ? <div>Loading.....</div>
                : !products || products.length === 0
                ? <div>No products found. Please try again later</div>
                : error
                ? <div>Error occured. {error}</div>
                : products.map((product, index) => <NewCard
                    key={product.id}
                    product={product}
                    subclass={classes[index]}
                    color={colors[index]}
                />
                )
            }
        </div>
    </div>
}
