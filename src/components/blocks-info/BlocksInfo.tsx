import styles from "./blocks-info.module.css";
import { BlocksInfoProps } from './blocks-info.types'
import { InfoItem } from "./info-item";

export function BlocksInfo({blocksInfo}: BlocksInfoProps) {
    return <div className={styles.blocksInfo}>
        {blocksInfo.map(block => 
            <InfoItem blockInfo={block}/>
        )}
    </div>
}