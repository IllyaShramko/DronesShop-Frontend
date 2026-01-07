import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import { AboutPage } from '../pages/about/AboutPage';
export function AppRoutes() {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='/about' element={<AboutPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
}