import { OrderWithTrackingInfo } from "../../../../shared/types";

export interface InfoContainerProps {
    order: OrderWithTrackingInfo
    refreshOrders: () => void
}