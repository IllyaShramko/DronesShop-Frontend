import { Outlet, useSearchParams } from "react-router-dom";
import { Footer } from "../footer";
import { Header } from "../header";
import { Main } from "../main";
import styles from './layout.module.css';
import { ModalLogin, ModalSignUp } from "../../components";
import { useEffect, useState } from "react";
import { useGetMe } from "../../hooks";

export function Layout() {
    useGetMe()
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [lastPageModal, setLastPageModal] = useState<string>("login")
    useEffect(() => {
        console.log("isOpenModal", isOpenModal)
    }, [isOpenModal])
    const [searchParams] = useSearchParams()
    const code = searchParams.get("code")
    if (code) {
        setLastPageModal("continueResetPassword")
        setIsOpenModal(true)
    }
    return (
        <div className={styles.container}>
            <Header setIsOpenModal={setIsOpenModal} />
            <div>
                <Main>
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
                : lastPageModal === "resetPassword"
                ? null
                : null
            }
        </div>
    )
}