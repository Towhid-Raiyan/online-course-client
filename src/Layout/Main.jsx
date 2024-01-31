import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";

const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet />
            <div className='min-h-[calc(100vh-300px)]'>
            <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;
