import { ReactNode } from "react"
import styles from "./main.module.css"

interface MainProps {
    children?: ReactNode,
    isAnother: boolean
}

export function Main(props: MainProps) {
    const {children, isAnother} = props
    return (
        <main className={styles.main}>
            {children}
            {!isAnother && <div className={styles.backgroundBottom}></div>}
        </main>
    )
}