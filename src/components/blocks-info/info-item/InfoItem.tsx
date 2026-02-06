import styles from "./info-item.module.css";
import { InfoItemProps } from "./info-item.types"
import { ParameterItem } from "./params-item";

export function InfoItem({blockInfo}: InfoItemProps) {
    return <div className={`${styles.blockinfo} ${styles[blockInfo.typeView]}`}>
        <div className={styles.text}>
            <div className={styles.titleContainer}>
                <h3>{blockInfo.title}</h3>
            </div>
            <div className={styles.descriptionContainer}>
                <p>{blockInfo.description}</p>
            </div>
        </div>
        {blockInfo.params.length !== 0 ? <div className={styles.params}>
            {blockInfo.params.map(param => (
                <ParameterItem parameterInfo={param}/>
            ))}
        </div> : null}
        <div className={styles.mediaContainer}>
            <img src={blockInfo.media}/>
        </div>
    </div>
}