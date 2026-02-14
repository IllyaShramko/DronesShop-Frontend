import { useEffect, useState } from "react";
import styles from "./catalog.module.css";
import { useGetProducts } from "../../hooks";
import { SelectCategory, ProductList, Pagination } from "../../components";

const LIMIT = 8;

export function CatalogPage() {
    const [selectedCategory, setSelectedCategory] = useState<"All" | number>("All");
    const { products, isLoading, error } = useGetProducts();

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (isNaN(+selectedCategory)) {
            setFilteredProducts(products);
        } else {
            const newFilteredProducts = products.filter(product => {
                return product.categoryId === +selectedCategory;
            });
            setFilteredProducts(newFilteredProducts);
        }
        setCurrentPage(1);

    }, [selectedCategory, products]);

    if (isLoading) {
        return <div>Loading.....</div>;
    }

    if (error) {
        return <div>Error occured. {error}</div>;
    }

    const totalPages = Math.ceil(filteredProducts.length / LIMIT);
    const startIndex = (currentPage - 1) * LIMIT;
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + LIMIT
    );

    return (
        <div className={styles.page}>
            <p className={styles.title}>Каталог</p>

            <div className={styles.content}>
                <SelectCategory
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <ProductList filteredProducts={paginatedProducts} />
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}