import { ProgressBarProps } from "./progress-bar.types";
import styles from "./progress-bar.module.css"
import { ICONS } from "../../../../shared/icons";
import { useEffect, useState } from "react";

export function ProgressBarDelivery(props: ProgressBarProps) {
    const {order} = props
    const [filledWidth, setFilledWidth] = useState<string>("30px");
    const getProgressStep = (statusCode: string | number) => {
        const code = String(statusCode);

        if (["9", "10", "11"].includes(code)) return 4; 
        if (["7", "8"].includes(code)) return 3;       
        if (["4", "5", "6", "101"].includes(code)) return 2; 
        if (["44", "45"].includes(code)) return 1;      
        return 0; 
    };
    
    const currentStep = getProgressStep(order.status);
    const steps = ["Оформлено", "Збирається", "У дорозі", "Доставлено", "Отримано"];
    useEffect(() => {
        setFilledWidth(
            currentStep === 0
            ? "55px"
            : currentStep === 1
            ? "29%"
            : currentStep === 2
            ? "52%"
            : currentStep === 3
            ? "75%"
            : currentStep === 4
            ? "calc(100% - 20px)"
            : "30px"
        )
    }, [])

    return <div className={styles.container}>
        <div className={styles.header}>
            <p className={styles.nameParameter}>Номер відправлення:</p>
            <p className={styles.valueParameter}>{order.trackingNumber}</p>
            <button onClick={() => {
                navigator.clipboard.writeText(order.trackingNumber);
            }}>
                <ICONS.Copy className={styles.copyIcon} />
            </button>
        </div>
        <div className={styles.body}>
            <div className={styles.background}>
                <div 
                    className={`${styles.progressBar} ${order.isCanceled && styles.canceledBar}`} 
                    style={{ 
                        width: `${filledWidth}`,
                    }}
                >
                    <ICONS.DeliveryIcon className={styles.delivery} />
                </div>
            </div>
            <div className={styles.points}>
                <div className={`${styles.point} ${currentStep >= 0 && styles.activatedPoint}`}></div>
                <div className={`${styles.point} ${currentStep >= 1 && styles.activatedPoint}`}></div>
                <div className={`${styles.point} ${currentStep >= 2 && styles.activatedPoint}`}></div>
                <div className={`${styles.point} ${currentStep >= 3 && styles.activatedPoint}`}></div>
                <div className={`${styles.point} ${currentStep >= 4 && styles.activatedPoint}`}></div>
            </div>
        </div>
        <div className={styles.footer}>
            {steps.map((step, index) => (
                <p key={index} className={`${currentStep >= index && styles.activated} ${styles["footerText" + index]} ${styles.footerText}`}>
                    {step}
                </p>
            ))}
        </div>
    </div>
}