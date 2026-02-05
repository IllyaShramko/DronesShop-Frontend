import { SimilarProductsProps } from "./similar-products.types";
import styles from "./similar-product.module.css"
import { useGetProducts, useGetSimilarProducts } from "../../hooks";
import { ProductCard } from "../products-list/product-card";
import { Link } from "react-router-dom";
import { ICONS } from "../../shared/icons";

export function SimilarProducts({id}: SimilarProductsProps) {
    const {products, isLoading, error} = useGetSimilarProducts({id})

    if (isLoading) {
        return <div>Loading.....</div>
    }
    if (error) {
        return <div>Error occured. {error}</div>
    }

    return <div className={styles.similarProducts}>
        <div className={styles.header}>
            <h1>Схожі товари</h1>
        </div>
        <div className={styles.products}>
            {products.map(product => 
                <ProductCard 
                    product={product}
                    key={product.id}
                ></ProductCard>)}
        </div>
        <div className={styles.buttonDiv}>
            <Link to={"/catalog"} className={styles.btn}>
                <p>Дивитись всі</p>
                <ICONS.RightArrowWhite/>
            </Link>
        </div>
    </div>
}