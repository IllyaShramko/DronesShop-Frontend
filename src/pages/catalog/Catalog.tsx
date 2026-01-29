import { useEffect, useState } from "react";
import { IMAGES } from "../../shared/images";
import styles from "./catalog.module.css";
import { useGetProducts } from "../../hooks";
import { SelectCategory, ProductList } from "../../components";


export function CatalogPage() {
    const [selectedCategory, setSelectedCategory] = useState<"All" | number>("All")
    const {products, isLoading, error} = useGetProducts()

    const [filteredProducts, setFilteredProducts] = useState(products)

    useEffect(() => {
        if (isNaN(+selectedCategory)) {
            setFilteredProducts(products)
            return;
        }
        const newFilteredProducts = products.filter(product => {
            return product.categoryId === +selectedCategory
        })
        setFilteredProducts(newFilteredProducts)

    }, [selectedCategory, products])

    if (isLoading) {
        return <div>Loading.....</div>
    }
    if (error) {
        return <div>Error occured. {error}</div>
    }
    return (
        <div className={styles.page}>
            <p className={styles.title}>Каталог</p>
            <div className={styles.content}>
                <SelectCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                <ProductList filteredProducts={filteredProducts}/>
            </div>  
        </div>
    );
}