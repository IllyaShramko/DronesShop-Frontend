export interface City {
    Ref: string;
    Description: string;
}

export interface MakeOrderFormState {
    firstName: string;
    lastName: string;
    patronymic: string;
    phone: string;
    email: string;
    city: string;      
    cityName: string;  
    warehouse: string; 
    deliveryType: 'warehouse' | 'postomat' | 'courier' | 'express';
    payment: "pay_now" | "pay_on_place";
    wishes?: string;
    street?: string;
}
export interface Warehouse {
    Ref: string;
    Description: string;
    TypeOfWarehouse: string;
    TotalMaxWeightAllowed: string;
    WarehouseStatus: string;
    POSTerminal: string;
    PostalCodeUA: string;
    Schedule: {
        Monday: string;
        Tuesday: string;
        Wednesday: string;
        Thursday: string;
        Friday: string;
        Saturday: string;
        Sunday: string;
    };
}
export interface MakeOrderProps {
    setOpenModal: () => void
}
