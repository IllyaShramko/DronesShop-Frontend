import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import { AboutPage } from '../pages/about/AboutPage';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';
import { HomePage } from '../pages/home/HomePage';
import { CatalogPage } from '../pages/catalog/Catalog';
export function AppRoutes() {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/catalog' element={<CatalogPage/>}/>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/*' element={<NotFoundPage/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
}