import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToken,deleteToken } from "../store/features/token.ts";

const Header = () => {
    const [loggedIn,setLoggedIn] = useState<boolean>(false)
    const [username,setUsername] = useState<string>('')
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const logoutHandler = ()=>{
        Cookies.remove('user')
        setLoggedIn(false)
        navigate('/login')
    }  
    useEffect(()=>{
        const func = async ()=>{
            const cookieData = Cookies.get('user')
            if(cookieData===null||cookieData===undefined){
                setLoggedIn(false)
                dispatch(deleteToken())
            }else{
                const cookie = await JSON.parse(cookieData)
                setUsername(cookie.data.user.username)
                dispatch(addToken(cookie.data.access))
                setLoggedIn(true)
            }
        }
        func()
    },[location])
    return ( <header className="h-32 fixed flex items-center justify-between px-10 bg-primary w-screen z-10">
        <Link to={"/"} className="flex items-center">
            <img src="logo.png" alt="home finder logo" className="h-32" />
            <h1 className="text-5xl text-white">Home Finder</h1>
        </Link>
        <div >
            {loggedIn?
            <div className="flex flex-col items-center">
                <div className="rounded-full bg-secondary w-8 h-8">
                    <FaRegCircleUser className="w-full h-full"/>
                </div>
                <p className="text-white">{username}</p>
                <button onClick={logoutHandler} className="text-white">sign out</button>
            </div>
            :<Link to={"/login"} className="text-white">sign in</Link>}
        </div>
    </header> );
}
 
export default Header;