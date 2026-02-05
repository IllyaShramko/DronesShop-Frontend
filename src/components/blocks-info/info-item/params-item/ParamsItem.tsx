import styles from "./params-item.module.css";
import { ParamsItemProps } from "./params-item.types";

export function ParameterItem({ parameterInfo }: ParamsItemProps) {
  return (
    <div className={styles.paramRow}>
      <span className={styles.paramName}>{parameterInfo.name}</span>
      <span className={styles.paramValue}>{parameterInfo.parameter}</span>
    </div>
  );
}
