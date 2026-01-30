import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import { AboutPage, CatalogPage, HomePage, NotFoundPage, ProductPage } from '../pages';
export function AppRoutes() {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/catalog' element={<CatalogPage/>}/>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/products/:id' element={<ProductPage/>}></Route>
                <Route path='/*' element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}