
export interface ModalLoginProps {
    isOpen: boolean
    onClose: () => void
    setIsOpenSignUp: (isOpen: boolean) => void
    setIsOpenResetPassword: (isOpen: boolean) => void
}
export interface LoginFormState {
    name: string
    email: string
    password: string
    confirmPassword: string
}