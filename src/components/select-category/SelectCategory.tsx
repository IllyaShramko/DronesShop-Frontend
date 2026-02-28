import styles from './select-category.module.css'
import { SelectCategoryProps } from './select-category.types'
import { Category } from '../../shared/types'
import { useGetCategories } from '../../hooks'


export function SelectCategory({selectedCategory, setSelectedCategory}: SelectCategoryProps){
    const {isLoading, categories, error} = useGetCategories()
    
    return (
        <div className={styles.selectCategories}>
            <label className={styles.selectedCategory}><input
                value={"All"}
                type="radio"
                onChange={() => {setSelectedCategory("All")}}
                checked={selectedCategory === "All"}
                />
                Всі
            </label>
            
            {
                isLoading 
                ? <div>Loading.....</div>
                : !categories || categories.length === 0
                ? <div>No categories found. Please try again later</div>
                : error
                ? <div>Error occured. {error}</div>
                : categories.map((category: Category) => {
                return (
                    <label key={category.id} className={styles.selectedCategory} >
                        <input
                            type="radio"
                            onChange={() => {
                                setSelectedCategory(category.id)
                            }}
                            checked={selectedCategory === category.id}
                            />
                        <img src={category.icon}/>
                    </label>
                )})
            }
        </div>
    )
}