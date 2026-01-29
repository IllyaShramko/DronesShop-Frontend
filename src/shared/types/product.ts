import { BlockInfo } from "./blockInfo";

export type Product = {
    id: number;
    name: string;
    previewPhoto: string;
    description: string;
    price: number;
    discount: number;
    totalStorage: number;
    categoryId: number;
}

export type FullProduct = {
    id: number;
    name: string;
    previewPhoto: string;
    description: string;
    price: number;
    discount: number;
    totalStorage: number;
    categoryId: number;
    blocksInfo: BlockInfo[]
}
