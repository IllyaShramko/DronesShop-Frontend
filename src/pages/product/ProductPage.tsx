import styles from "./product.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductById } from "../../hooks";
import { useEffect } from "react";
import { SmallActionsProduct,BlocksInfo } from "../../components";



export function ProductPage() {
    const {id} = useParams<{id: string}>()
    const currentId = Number(id)
    const {product, isLoading, error} = useGetProductById({id: currentId})
    const navigate = useNavigate()

    useEffect(() => {
        document.body.style.backgroundColor = '#CDD5DD';
        return () => {
            document.body.style.backgroundColor = '#ffffff';
        };
    }, []);

    useEffect(() => {
        if (isNaN(currentId)) {
            navigate("/")
        }
    }, [currentId])
    

    if(isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error occured. Try again later. <p>{error}</p></div>
    }
    if (!product) {
        navigate('/products')
        return null;
    }
    console.log(product)
    return <div className={styles.page}>
        <div className={styles.header}>
            <div className={styles.texts}>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
            </div>
            <div className={styles.imageContainer}>
                <img src={product.previewPhoto} className={styles.image}/>
            </div>
            <div className={styles.bottomBackground}></div>
        </div>
        <div className={styles.main}>
            <BlocksInfo blocksInfo={product.blocksInfo}></BlocksInfo>
        </div>
        <SmallActionsProduct product={product}></SmallActionsProduct>
    </div>
}