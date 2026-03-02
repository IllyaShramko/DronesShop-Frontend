import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnotherLayout, Layout } from './layout';
import { AboutPage, CatalogPage, CompleteOrder, ContactsPage, HomePage, MakeOrderPage, NotFoundPage, ProductPage, UserContactInfoPage } from '../pages';
import { CabinetLayout } from './cabinet-layout';
import { UserAddressesInfoPage } from '../pages/user-addresses-info';
import { UserOrdersInfoPage } from '../pages/user-orders-info/UserOrdersInfoPage';
import { useState } from 'react';

export function AppRoutes() {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

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
                    <Route path='addresses' element={<UserAddressesInfoPage/>}/>
                    <Route path='orders' element={<UserOrdersInfoPage />}/>
                </Route>
            </Route>
            <Route path='/' element={<AnotherLayout setCloseOpenModal={() => setIsOpenModal(false)} isOpenModal={isOpenModal} />}>
                <Route path='/make-order' element={<MakeOrderPage setOpenModal={()=> {setIsOpenModal(true)}} />} />
                <Route path='/order-complete' element={<CompleteOrder />} />
            </Route>
        </Routes>
    </BrowserRouter>
}