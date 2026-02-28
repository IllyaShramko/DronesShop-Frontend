import styles from "./header.module.css"
import { ICONS } from "../../../shared/icons"
import { IMAGES } from "../../../shared/images"
import { Link } from "react-router-dom"
import { useState } from "react"
import { HeaderProps } from "./header.types"
import { useCartContext, useUserContext } from "../../../context"

export function Header(props: HeaderProps) {
    const {token, user} = useUserContext()
    const {items} = useCartContext()
    const { setIsOpenLoginModal, setIsOpenCartModal } = props

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
            <button className={styles.actionIcon} onClick={() => {
                setIsOpenCartModal()
                console.log("open modal1")
            }}>
                <ICONS.Purchases/>
                {
                    !items || items.length === 0
                    ? null
                    : <div className={styles.countItems}>
                        <p>{items.length}</p>
                    </div>
                }
            </button>
            {
                user && token 
                ? <Link to={"/cabinet"} className={styles.actionIcon}>
                    <ICONS.User/>
                </Link>
                : <button className={styles.actionIcon} onClick={() => {
                    setIsOpenLoginModal()
                    console.log("open modal")
                    }}>
                    <ICONS.User/>
                </button>
            }
            
        </div>
        <div className={styles.background}></div>
    </header>
}