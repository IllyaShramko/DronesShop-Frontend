import styles from './select-category.module.css'
import { SelectCategoryProps } from './select-category.types'
import { Category } from '../../shared/types'
import { useGetCategories } from '../../hooks'


export function SelectCategory({selectedCategory, setSelectedCategory}: SelectCategoryProps){
    const {isLoading, categories, error} = useGetCategories()

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <p>{error}</p>
    }
    
    return (
        <div className={styles.selectCategories}>
            <label className={styles.selectedCategory}><input
                value={"All"}
                type="radio"
                onChange={event => {setSelectedCategory("All")}}
                checked={selectedCategory === "All"}
                />
                Всі
            </label>
            {categories.map((category: Category) => {
                return (
                    <label key={category.id} className={styles.selectedCategory} >
                        <input
                            type="radio"
                            onChange={event => {
                                setSelectedCategory(category.id)
                            }}
                            checked={selectedCategory === category.id}
                            />
                        <img src={category.icon}/>
                    </label>
                )
            })}
        </div>
    )
}