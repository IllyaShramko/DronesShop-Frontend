import { Product } from "./product";

export type Order = {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    phoneNumber: string;
    email: string;
    userId: number;
    status: string;
    totalPrice: number;
    discountPrice: number;
    typePay: string;
}
export type OrderWithProducts = {
    id: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    phoneNumber: string;
    email: string;
    userId: number;
    status: string;
    totalPrice: number;
    discountPrice: number;
    typePay: string;
    trackingNumber: string;
    ref: string;
    isCanceled: boolean;
    createdAt: Date;
    updatedAt: Date;
    products: {
        product: Product;
        ordered: number;
        productId: number;
        orderId: number;
    }[];
}

export interface NPDeliveryStatus {
    status: string;          
    statusCode: string;      
    warehouse: string;       
    actualDeliveryDate: string; 
    cost: string;       
    payer: string;      
}

export interface OrderWithTrackingInfo extends OrderWithProducts {
    deliveryStatus?: NPDeliveryStatus; 
}