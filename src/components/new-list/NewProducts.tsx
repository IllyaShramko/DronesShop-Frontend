import styles from "./new-list.module.css";
import { ICONS } from "../../shared/icons";
import { IMAGES } from "../../shared/images";
import { useGetNewProducts } from "../../hooks";
import { NewCard } from "./new-card/NewCard";

export function NewProducts() {
    const {products, isLoading, error} = useGetNewProducts({limit: 3, offset: 0})
    if (isLoading) {
        return <div>Loading.....</div>
    } else if (!products) {
        return <div>No products found</div>
    }
    if (error) {
        return <div>Error occured. {error}</div>
    }
    const colors = ["#F5BE4F", "#1A271B", "#4F94A4"]
    const classes = ["firstDrone", "secondDrone", "thirdDrone"]
    return <div className={styles.newProducts}>
        <div className={styles.header}>
            <h1>Нове на сайті</h1>
        </div>
        <div className={styles.cards}>
            {products.map((product, index) => <NewCard
                    key={product.id}
                    product={product}
                    subclass={classes[index]}
                    color={colors[index]}
                />
            )}
        </div>
    </div>
}
