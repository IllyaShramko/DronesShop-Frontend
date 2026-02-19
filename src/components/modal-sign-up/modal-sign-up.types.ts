
export interface ModalSignUpProps {
    isOpen: boolean
    onClose: () => void
    setIsOpenLogin: (isOpen: boolean) => void
}
export interface SignUpFormState {
    firstName: string
    email: string
    password: string
    confirmPassword: string
}