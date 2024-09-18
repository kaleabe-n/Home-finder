import React, { ChangeEvent, useEffect, useState } from "react";
import { useLoginMutation } from "../store/index.ts"; 
import { jwtDecode } from "jwt-decode";
import User, { UserToken } from "../types/User.ts"
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username,setUsername] = useState<string>("")
    const [usernameError,setUsernameError] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [passwordError,setPasswordError] = useState<string>("")
    const [loginUser,{data,isSuccess,isError,error}] = useLoginMutation()
    const [hasError,setHasError] = useState<boolean>(true)
    const [formError,setFormError] = useState<string>("")
    const [btnclr,setBtnclr] = useState<string>('bg-gray-500')
    const navigate = useNavigate()
    const validator:()=>void = ()=>{
        if(username.length === 0){
            setUsernameError('username is required')
        } else {
            setUsernameError('')
        }
        if(password.length === 0){
            setPasswordError('password is required')
        } else if(password.length < 8){
            setPasswordError('password must have length atleast 8')
        } else{
            setPasswordError('')
        }
         
    }
    const errorModifier:()=>void = ()=>{
        if (passwordError || usernameError){
            setBtnclr("bg-gray-500")
            setHasError(true)
        } else {
            setBtnclr("bg-primary")
            setHasError(false)
        }
    }
    useEffect(()=>{validator()},[username,password,validator])
    useEffect(()=>{errorModifier()},[usernameError,passwordError,errorModifier])
    const usernameInputHandler:(e:ChangeEvent<HTMLInputElement>)=>void = (e)=>{
        setUsername(e.target.value)
        
    }

    const passwordInputHandler:(e:ChangeEvent<HTMLInputElement>)=>void = (e)=>{
        setPassword(e.target.value)
    }

    let loginHandler:()=>void = async()=>{
        await loginUser({username:username,password:password})
        if(isSuccess){
            const decoded = jwtDecode<UserToken>(data!.access)
            const user:User = {
                username: decoded.username, 
                email: decoded.email, 
                is_verified: decoded.is_verified, 
                is_superuser: decoded.is_verified, 
                profile: decoded.profile, 
                phone: decoded.phone,
                password:null,
                access:data!.access,
                refresh:data!.refresh,
                first_name:decoded.first_name,
                last_name:decoded.last_name
            }
            const cookieData = {
                data:{
                    access:user.access,
                    refresh:user.refresh,
                    user:user
                }
            }
            setHasError(false)
            Cookies.set("user",JSON.stringify(cookieData))
            navigate("/")
        }else if(isError){
            setHasError(true)
            if("data" in error!){
                if(error.status === null){
                    setFormError("make sure you are connected to the internet")
                }else{
                    //@ts-ignore
                    setFormError(error!.data.detail)
                }
                
            }else if("message" in error!){
                setFormError(error!.message?error!.message:"failed to login")
            }
        }
    }

    return ( <main className="bg-secondary pt-36 flex flex-col h-min items-center">
        <div className="rounded-lg bg-slate-50 w-min px-20 pt-20 pb-10 flex flex-col items-start text-left mb-10">
            <img src="login-icon.png" alt="person using phone with login mobile icon" className="h-32 md:h-36 self-center" />
            <label htmlFor="username" className="font-light mt-5 mb-2 ms-2">username</label>
            {usernameError && <p className="font-light text-red-800">{usernameError}</p>}
            <input type="text" id="username" className="border border-gray-600/40 rounded-lg h-10 w-64 md:w-80 p-3" placeholder="enter username" value={username} onChange={usernameInputHandler}/>
            <label htmlFor="password" className="font-light mt-5 mb-2 ms-2">password</label>
            {passwordError && <p className="font-light text-red-800">{passwordError}</p>}
            <input type="password" id="password" className="border border-gray-600/40 rounded-lg h-10 w-64 md:w-80 p-3" placeholder="enter password" value={password} onChange={passwordInputHandler}/>

            {hasError && <p className="font-light text-red-800">{formError}</p>}
            <button className={`h-10 w-64 md:w-80 rounded-lg mt-8 text-gray-50 ${btnclr}`} onClick={loginHandler} disabled={passwordError+usernameError?true:false}>Sign In</button>

            <p className="mt-8">Don't have an account <span className="text-blue-600"><Link to="/signup">sign up</Link></span></p>
        </div>
    </main> );
}
 
export default LoginPage;