import styles from "./contacts.module.css"
import { ICONS } from "../../shared/icons"
import { Link } from "react-router-dom"
import { ContactsInfo, FormContacts } from "../../components"
import { useGoHead } from "../../shared/hooks"
import { useEffect } from "react"
export function ContactsPage() {
    const goHead = useGoHead()
    useEffect(() => {
        goHead()
    }, [])
    return <div className={styles.page}>
        <div className={styles.header}>
            <h1>Контакти</h1>
        </div>
        <div className={styles.content}>
            <ContactsInfo/>
            <FormContacts/>
        </div>
    </div>
}