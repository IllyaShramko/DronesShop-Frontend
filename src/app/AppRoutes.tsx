import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import { AboutPage } from '../pages/about/AboutPage';
import { NotFoundPage } from '../pages/not-found/NotFoundPage';
export function AppRoutes() {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/about' element={<AboutPage/>}/>
                <Route path='/*' element={<NotFoundPage/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
}