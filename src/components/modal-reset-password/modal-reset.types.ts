
export interface ModalResetPasswordProps {
    isOpen: boolean
    onClose: () => void
    lastPageModal: string
    setLastPageModal: (page: string) => void
}
export interface ResetPasswordFormState {
    email: string
}
export interface ContinueResetPasswordFormState {
    password: string
    confirmPassword: string
}