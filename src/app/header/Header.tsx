import styles from "./header.module.css"
import { ICONS } from "../../shared/icons"
import { IMAGES } from "../../shared/images"
import { Link } from "react-router-dom"
import { useState } from "react"
import { HeaderProps } from "./header.types"

export function Header(props: HeaderProps) {
    const { setIsOpenModal } = props

    return <header className={styles.header}>
        <nav className={styles.navigation}>
            <Link to={"/catalog"}>Каталог</Link>
            <Link to={"/about"}>Про нас</Link>
            <Link to={"/contacts"}>Контакти</Link>
        </nav>
        <Link to={"/"} className={styles.logoContainer}>
            <img src={IMAGES.Logo} alt="" />
        </Link>
        <div className={styles.actionsUser}>
            <div className={styles.actionIcon}>
                <ICONS.Purchases/>
            </div>
            <button className={styles.actionIcon} onClick={() => {
                setIsOpenModal(true)
                console.log("open modal")
                
                }}>
                <ICONS.User/>
            </button>
        </div>
        <div className={styles.background}></div>
    </header>
}