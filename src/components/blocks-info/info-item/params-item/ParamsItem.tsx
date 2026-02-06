import styles from "./params-item.module.css"
import { ParamsItemProps } from "./params-item.types"

export function ParameterItem({parameterInfo}: ParamsItemProps) {
    return <div className={styles.parameterInfo}>
        <div className={styles.paramHead}>
            <h3>{parameterInfo.parameter}</h3>
        </div>
        <div className={styles.paramDescription}>
            <p>{parameterInfo.name}</p>
        </div>
    </div>
}