import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './layout';

export function AppRoutes() {
    return <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                
            </Route>
        </Routes>
    </BrowserRouter>
}