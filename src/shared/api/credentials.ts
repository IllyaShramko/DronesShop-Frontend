
export interface ContactFormCredentials {
    name: string;
    phonenumber: string;
    email: string;
    message: string
}
export interface LoginCredentials {
    email: string;
    password: string;
}
export interface RegisterCredentials {
    firstName: string;
    email: string;
    password: string;
}
export interface UserInformationEditCredentials {
    firstName: string;
    lastName?: string;
    patronymic?: string;
    phoneNumber?: string;
    email: string;
}
export interface AddressCredentials {
    city: string;
    street: string;
    houseNumber: number;
    apartamentNumber: number;
    entranceNumber: number;
}
export interface EditAddressCredentials {
    id: number;
    city: string;
    street: string;
    houseNumber: number;
    apartamentNumber: number;
    entranceNumber: number;
}