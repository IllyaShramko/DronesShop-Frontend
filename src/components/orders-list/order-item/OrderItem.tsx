import { ICONS } from "../../../shared/icons";
import { OrderWithTrackingInfo } from "../../../shared/types";
import { InfoContainer } from "./info-container";
import { OrderItemProps } from "./order-item.types";
import styles from "./order-itme.module.css"
import { ProgressBarDelivery } from "./progress-bar";

export function OrderItem(props: OrderItemProps) {
    const {order, setwhichOpened, whichOpened, index, refreshOrders} = props

    const getStatusClass = (order: OrderWithTrackingInfo) => {
        const code = order.deliveryStatus?.statusCode;
        if (!code) {
            return "none"
        }

        if (order.isCanceled || ["2", "102", "103", "108"].includes(code)) {
            return "canceled";
        }

        if (["9", "10", "11"].includes(code)) {
            return "completed";
        }

        return "inProcess";
    };

    return <div className={styles.order}>
        <div onClick={() => {
            if (whichOpened === index) {
                setwhichOpened(null)
                return
            }
            setwhichOpened(index)
        }} className={styles.header}>
            <div className={styles.leftSideHeader}>
                <div className={`${styles.statusCircle} ${styles[getStatusClass(order)]}`}></div>
                <div className={styles.headerBlockInfo}>
                    <p className={styles.headerBlockInfoUpText}>
                        №{order.id} від {new Date(order.updatedAt).toLocaleDateString('uk-UA')}
                    </p>
                    <p className={styles.headerBlockInfoDownText}>{order.isCanceled ? "Скасовано" : order.status}</p>
                </div>
                <div className={styles.headerBlockInfo}>
                    <p className={styles.headerBlockInfoUpText}>Номер відправлення</p>
                    <p className={styles.headerBlockInfoDownText}>{order.trackingNumber}</p>
                </div>
                <div className={styles.headerBlockInfo}>
                    <p className={styles.headerBlockInfoUpText}>
                        Сума замовлення
                    </p>
                    <p className={styles.headerBlockInfoDownText}>{order.discountPrice}.00 ₴</p>
                </div>
            </div>
            <div className={styles.rightSideHeader}>
                {order.products.slice(0, 3).map((product, index) => (
                    <div className={styles.headerProductIcon} key={index}>
                        <img src={product.product.previewPhoto} alt="Product" />
                    </div>
                ))}

                {order.products.length > 3 && (
                    <div className={styles.moreProductsCount}>
                        <p>+{order.products.length - 3}</p>
                    </div>
                )}
                <ICONS.arrowBlue80 className={`${styles.arrowBlue} ${whichOpened === index && styles.rotate}`} />
            </div>
        </div>
        {
            whichOpened === index
            ? <div className={styles.body}>
                <ProgressBarDelivery order={order} />
                <InfoContainer order={order} refreshOrders={refreshOrders} />
            </div>
            : null
        }
    </div>
}