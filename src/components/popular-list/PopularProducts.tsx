import styles from "./popular-list.module.css";
import { ICONS } from "../../shared/icons";
import { Link } from "react-router-dom";
import { useGetPopularProducts } from "../../hooks";
import { ProductCard } from "../../shared/components/product-card";

export function PopularProducts() {
    const {products, isLoading, error} = useGetPopularProducts({limit: 4, offset: 0})
    return <div className={styles.popularCatalog}>
        <div className={styles.header}>
            <h1>Каталог</h1>
        </div>
        <div className={styles.cards}>
            {
                isLoading 
                ? <div>Loading.....</div>
                : !products || products.length === 0
                ? <div>No products found. Please try again later</div>
                : error
                ? <div>Error occured. {error}</div>
                : products.map(product => <ProductCard
                    product={product}
                    subclass={styles.productCard}
                />)
            }
        </div>
        <div className={styles.buttonDiv}>
            <Link to={"/catalog"} className={styles.btn}>
                <p>Дивитись всі</p>
                <ICONS.RightArrowWhite/>
            </Link>
        </div>
    </div>
}