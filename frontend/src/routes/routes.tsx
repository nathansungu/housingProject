import {Route, Routes} from 'react-router-dom';
import { HomePage } from '../pages/homePage';
import { LandingPage} from '../pages/landingPage';
const pagesRoutes = () =>{
    return (
        <>
        <Routes>
            //invalid route 
            
            <Route path="/" element={<LandingPage/>} />
            <Route path="/home" element={<HomePage/>} />
        </Routes>
        
        </>
    )
}

export default pagesRoutes;