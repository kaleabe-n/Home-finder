import React from "react";

const Footer = () => {
    return ( <footer className="h-max md:h-80 bg-primary text-white px-10 md:px-20 pt-10 md:pt-20 pb-10">
        <div className="flex md:flex-row flex-col items-center">
            <div className="flex flex-col items-center">
                <img src="logo.png" alt="home finder logo" className="h-32" />
                <p className="text-2xl w-max">Home Finder</p>
            </div>
            <div className="flex justify-center w-full">
                <div className="text-center">
                    <h2 className="font-semibold">Contact Us</h2>
                    <p>Phone📞:0990090909</p>
                    <p>Email📧:homefinder@email.com</p>
                    <p>Addis Ababa Ethiopia</p>
                </div>
            </div>
            
        </div>
        <hr className="md:mt-10"/>
        <p>©All rights reserved 2023 Home Finder</p>
    </footer> );
}
 
export default Footer;