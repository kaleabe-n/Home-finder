import React from "react";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return ( <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div> );
}
 
export default Layout;