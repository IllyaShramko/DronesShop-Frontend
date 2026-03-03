import { InfoContainerProps } from "./info-container.types";
import styles from "./info-container.module.css"
import { ProductItem } from "./product-item";
import { useCancelOrder } from "../../../../hooks";
import { useGoHead } from "../../../../shared/hooks";
import { useFormatNumber } from "../../../../shared/hooks/use-format-number";

export function InfoContainer(props: InfoContainerProps) {
    const {order, refreshOrders} = props
    const [cancelOrder, {isLoading, error}] = useCancelOrder()
    const goHead = useGoHead()
    const formatNum = useFormatNumber()

    async function cancel() {
        const response = await cancelOrder({id: order.id})
        if (response.error === "OK") {
            refreshOrders()
            goHead()
        } else {
            return
        }
    }

    return <div className={styles.container}>
        <h4 className={styles.subtitle}>Інформація про замовлення</h4>
        <div className={styles.containerInfo}>
            <div className={styles.leftSide}>
                <div className={styles.leftSideContinars}>
                    <h4 className={styles.subtitle}>Адреса доставки</h4>
                    {
                        order.deliveryStatus ? order.deliveryStatus.serviceType === 'WarehouseDoors'
                            ? <p className={styles.infoText}>Кур'єрська доставка</p>
                            : <p className={styles.infoText}>Нова Пошта до відділення</p>
                        : null
                    }
                    <p className={styles.infoText}>{order.deliveryStatus?.address}</p>
                </div>
                <div className={styles.leftSideContinars}>
                    <h4 className={styles.subtitle}>Отримувач</h4>
                    <p className={styles.infoText}>{order.firstName} {order.lastName}</p>
                    <p className={styles.infoText}>+{order.phoneNumber}</p>
                </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.rightSide}>
                <div className={styles.products}>
                    <div className={styles.wrappers}>
                        <p>Фото</p>
                        <p>Назва</p>
                        <p>Ціна</p>
                        <p>Кількість</p>
                        <p>Сума</p>
                    </div>
                    <div className={styles.productsContainer}>
                        {order.products.map(product => {
                            return <ProductItem product={product} />
                        })}
                    </div>
                </div>
                <div className={styles.paymentFullInfo}>
                    <div className={styles.paymentContainer}>
                        <p className={styles.subtitle}>Оплата</p>
                        <p className={styles.infoText}>Накладний платіж</p>
                    </div>
                    <div className={styles.paymentContainer}>
                        <p className={styles.subtitle}>Доставка</p>
                        <p className={styles.infoText}>За тарифами перевізника</p>
                    </div>
                    <div className={styles.paymentContainer}>
                        <p className={styles.subtitle}>Загальна сума</p>
                        <p className={styles.infoText}>{formatNum(order.totalPrice)} ₴</p>
                    </div>
                    <div className={styles.paymentContainer}>
                        <p className={styles.subtitle}>Заощаджено</p>
                        <p className={styles.infoText}>{formatNum(order.totalPrice - order.discountPrice)} ₴</p>
                    </div>
                    <div className={styles.paymentContainer}>
                        <p className={styles.subtitle}>Разом</p>
                        <p className={styles.infoText}>{formatNum(order.discountPrice)} ₴</p>
                    </div>
                </div>
                {
                    !order.isCanceled && <button onClick={cancel} className={`${styles.cancelButton} ${order.isCanceled && styles.disabled}`} disabled={order.isCanceled}>
                        Скасувати
                    </button>
                }
            </div>
        </div>
    </div>
}