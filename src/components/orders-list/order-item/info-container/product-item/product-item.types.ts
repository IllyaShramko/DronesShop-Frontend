import { Product } from "../../../../../shared/types";

export interface ProductItemProps {
    product: {
        product: Product;
        ordered: number;
        productId: number;
        orderId: number;
    }
}