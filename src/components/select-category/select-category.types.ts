export interface SelectCategoryProps {
    selectedCategory: "All" | number;
    setSelectedCategory: (value: "All" | number) => void
}