
export interface ModalResetPasswordProps {
    isOpen: boolean
    onClose: () => void
    lastPageModal: string
    setLastPageModal: (page: string) => void
}