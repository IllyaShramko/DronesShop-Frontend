import { Outlet, useSearchParams } from "react-router-dom";
import { AnotherFooter } from "../../footer";
import { AnotherHeader } from "../../header";
import { Main } from "../../main";
import styles from './layout.module.css';
import { useGetMe } from "../../../hooks";
import { LayoutProps } from "./another-layout.types";
import { ModalCart } from "../../../components";

export function AnotherLayout(props: LayoutProps) {
    const {isOpenModal, setCloseOpenModal} = props
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
            <ModalCart 
                isOpen={isOpenModal}
                onClose={setCloseOpenModal}
                variant="edit"
            />
        </div>
    )
}