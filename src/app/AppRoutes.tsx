import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import { AboutPage, CatalogPage, ContactsPage, HomePage, NotFoundPage, ProductPage, UserContactInfoPage } from '../pages';
import { CabinetLayout } from './cabinet-layout';
export function AppRoutes() {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/catalog' element={<CatalogPage/>}/>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/products/:id' element={<ProductPage/>}></Route>
                <Route path='/contacts' element={<ContactsPage/>}></Route>
                <Route path='/*' element={<NotFoundPage/>}/>
                <Route path='/cabinet/' element={<CabinetLayout/>}>
                    <Route path='' element={<UserContactInfoPage/>}/>
                    <Route path='orders' element={<h1>Orders</h1>}/>
                    <Route path='addresses' element={<h1>Addresses</h1>}/>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}