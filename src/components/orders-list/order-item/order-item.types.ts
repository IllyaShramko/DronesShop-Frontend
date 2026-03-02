import { OrderWithTrackingInfo } from "../../../shared/types";

export interface OrderItemProps {
    order: OrderWithTrackingInfo
    setwhichOpened: (idx: number | null) => void
    whichOpened: number | null
    index: number
    refreshOrders: () => void
}