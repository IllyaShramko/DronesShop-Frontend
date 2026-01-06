import { Outlet } from "react-router-dom";
import { Footer } from "../footer";
import { Header } from "../header";
import { Main } from "../main";
import styles from './layout.module.css';

export function Layout() {
    return (
        <div className={styles.container}>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </div>
    )
}