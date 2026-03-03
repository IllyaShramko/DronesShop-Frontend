import { Outlet, useSearchParams } from "react-router-dom";
import { Footer } from "../../footer";
import { Header } from "../../header";
import { Main } from "../../main";
import styles from './layout.module.css';
import { ModalCart, ModalLogin, ModalResetPassword, ModalSignUp } from "../../../components";
import { useEffect, useState } from "react";
import { useGetMe } from "../../../hooks";

export function Layout() {
    useGetMe()
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [lastPageModal, setLastPageModal] = useState<string>("login")
    useEffect(() => {
        console.log("isOpenModal", isOpenModal)
    }, [isOpenModal])
    const [searchParams] = useSearchParams()
    const code = searchParams.get("code")
    useEffect(() => {
        if (code) {
            setLastPageModal("continueResetPassword")
            setIsOpenModal(true)
        }
    }, [code])
    return (
        <div className={styles.container}>
            <Header
                setIsOpenCartModal={() => {
                    setLastPageModal("cart")
                    setIsOpenModal(true)
                }}
                setIsOpenLoginModal={()=>{
                    setLastPageModal("login")
                    setIsOpenModal(true)
                }}
                isOpen={isOpenModal}
            />
            <div>
                <Main isAnother={false}>
                    <Outlet />
                </Main>
                <Footer />
            </div>
            {
                lastPageModal === "login"
                ? <ModalLogin
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    setIsOpenSignUp={(isOpen) => {
                        setLastPageModal("signUp")
                        setIsOpenModal(isOpen)
                    }}
                    setIsOpenResetPassword={(isOpen) => {
                        setLastPageModal("resetPassword")
                        setIsOpenModal(isOpen)
                    }}
                />
                : lastPageModal === "signUp"
                ? <ModalSignUp
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    setIsOpenLogin={(isOpen) => {
                        setLastPageModal("login")
                        setIsOpenModal(isOpen)
                    }}
                />
                : lastPageModal === "continueResetPassword" || lastPageModal === "resetPassword"
                ? <ModalResetPassword
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    lastPageModal={lastPageModal}
                    setLastPageModal={setLastPageModal}
                />
                : lastPageModal === "cart"
                ? <ModalCart 
                    isOpen={isOpenModal}
                    onClose={() => setIsOpenModal(false)}
                    variant="default"
                />
                : null
            }
        </div>
    )
}