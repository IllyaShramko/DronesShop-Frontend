import styles from './product-list.module.css';
import { ProductCard } from "../../shared/components/product-card/ProductCard"
import { ProductListProps } from "./product-list.types";

export function ProductList({filteredProducts}: ProductListProps) {
    return <div className={styles.content}>
        {filteredProducts.map(product => 
            <ProductCard 
                product={product}
                key={product.id}
                subclass={styles.productCard}
            ></ProductCard>)}
    </div>
}