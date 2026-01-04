import {Route, Routes} from 'react-router-dom';
import { HomePage } from '../pages/homePage';
import { LandingPage} from '../pages/landingPage';
import { RegisterPage } from '../pages/registerPage';
import{ HandleLogin }from '../pages/loginPage';
import Protected from '../middleware/protectedRoutes';
import refreshToken from '../middleware/refreshToken';
const pagesRoutes = () =>{

    return (
        refreshToken(),
        <>
        <Routes>
            //invalid route 
            
            <Route path="/" element={<LandingPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path ="/login" element={<HandleLogin/>} />

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