import { Outlet, useSearchParams } from "react-router-dom";
import { AnotherFooter } from "../../footer";
import { AnotherHeader } from "../../header";
import { Main } from "../../main";
import styles from './layout.module.css';
import { ModalLogin, ModalResetPassword, ModalSignUp } from "../../../components";
import { useGetMe } from "../../../hooks";

export function AnotherLayout() {
    useGetMe()
    return (
        <div className={styles.container}>
            <AnotherHeader />
            <div>
                <Main isAnother={true}>
                    <Outlet />
                </Main>
                <AnotherFooter />
            </div>
        </div>
    )
}