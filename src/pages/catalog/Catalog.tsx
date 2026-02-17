import { useEffect, useState } from "react";
import { IMAGES } from "../../shared/images";
import styles from "./catalog.module.css";
import { useGetProducts } from "../../hooks";
import { SelectCategory, ProductList } from "../../components";
import { useGoHead } from "../../shared/hooks";


export function CatalogPage() {
    const goHead = useGoHead()
    
    const [selectedCategory, setSelectedCategory] = useState<"All" | number>("All")
    const {products, isLoading, error} = useGetProducts()

    const [filteredProducts, setFilteredProducts] = useState(products)

    useEffect(() => {
        goHead()
        if (isNaN(+selectedCategory)) {
            setFilteredProducts(products)
            return;
        }
        const newFilteredProducts = products.filter(product => {
            return product.categoryId === +selectedCategory
        })
        setFilteredProducts(newFilteredProducts)

    }, [selectedCategory, products])

    return (
        <div className={styles.page}>
            <p className={styles.title}>Каталог</p>
            {
                isLoading ? <div>Завантаження.....</div> : error ? <div>Помилка при завантаженні продуктів. {error}</div> : 
                <div className={styles.content}>
                    <SelectCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                    <ProductList filteredProducts={filteredProducts}/>
                </div> 
            }
        </div>
    );
}