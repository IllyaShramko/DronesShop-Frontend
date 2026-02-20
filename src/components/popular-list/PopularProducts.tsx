import styles from "./popular-list.module.css";
import { ICONS } from "../../shared/icons";
import { Link } from "react-router-dom";
import { PopularCard } from "./popular-card/PopularCard";
import { useGetPopularProducts } from "../../hooks";

export function PopularProducts() {
    const {products, isLoading, error} = useGetPopularProducts({limit: 4, offset: 0})
    if (isLoading) {
        return <div>Loading.....</div>
    } else if (!products) {
        return <div>No products found. Try again later</div>
    }
    if (error) {
        return <div>Error occured. {error}</div>
    }
    return <div className={styles.popularCatalog}>
        <div className={styles.header}>
            <h1>Каталог</h1>
        </div>
        <div className={styles.cards}>
            {products.map(product => <PopularCard product={product}/>)}
        </div>
        <div className={styles.buttonDiv}>
            <Link to={"/catalog"} className={styles.btn}>
                <p>Дивитись всі</p>
                <ICONS.RightArrowWhite/>
            </Link>
        </div>
    </div>
}