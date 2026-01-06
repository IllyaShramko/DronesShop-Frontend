import { ReactNode } from "react"
import styles from "./main.module.css"

interface MainProps {
    children?: ReactNode
}

export function Main(props: MainProps) {
    const {children} = props
    return (
        <main className={styles.main}>
            {children}
        </main>
    )
}