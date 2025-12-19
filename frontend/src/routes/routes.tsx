import {Route, Routes} from 'react-router-dom';
import { HomePage } from '../pages/homePage';
import { LandingPage} from '../pages/landingPage';
import { RegisterPage } from '../pages/registerPage';
import Protected from '../middleware/protectedRoutes';
const pagesRoutes = () =>{
    return (
        <>
        <Routes>
            //invalid route 
            
            <Route path="/" element={<LandingPage/>} />
            <Route path="/register" element={<RegisterPage/>} />

            //protected routes
            <Route path="/home" element={
                <Protected>
                <HomePage/>
                </Protected>
            } />

        </Routes>
        
        </>
    )
}

export default pagesRoutes;