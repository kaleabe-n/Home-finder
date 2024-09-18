import React, { ChangeEvent, useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSignupMutation } from "../store/features/auth.ts";
import Signup from "../types/Signup.ts"
import Cookies from "js-cookie";

const SignUpPage = () => {
    const [username,setUsername] = useState<string>("")
    const [usernameError,setUsernameError] = useState<string>("")
    const [firstName,setFirstName] = useState<string>("")
    const [firstNameError,setFirstNameError] = useState<string>("")
    const [lastName,setLastName] = useState<string>("")
    const [lastNameError,setLastNameError] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [emailError,setEmailError] = useState<string>("")
    const [phone,setPhone] = useState<string>("")
    const [phoneError,setPhoneError] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [passwordError,setPasswordError] = useState<string>("")
    const [confirmPassword,setConfirmPassword] = useState<string>("")
    const [confirmPasswordError,setConfirmPasswordError] = useState<string>("")
    const [formError,setFormError] = useState<string>("")
    const [hasError,setHasError] = useState<boolean>(false)
    const [hasFormError,setHasFormError] = useState<boolean>(false)
    const [btnclr,setBtnClr] = useState<string>("bg-gray-500")
    const navigate = useNavigate()

    const [signup,{isLoading,isError,error,data,isSuccess}] = useSignupMutation()

    const validateEmail = (email:string) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        };
    const validator = ()=>{
        if(username.length === 0){
            setUsernameError("user name is required")
        } else {
            setUsernameError("")
        }
        if(firstName.length<3 || firstName.length>20){
            setFirstNameError('first name must be between 3 and 20')
        } else {
            setFirstNameError("")
        }
        if(lastName.length<3 || lastName.length>20){
            setLastNameError('last name must be between 3 and 20')
        } else {
            setLastNameError("")
        }
        if(email.length === 0){
            setEmailError("email is required")
        }else if(!validateEmail(email)){
            setEmailError('enter a valid email address')
        } else {
            setEmailError("")
        }
        if(!/^\d+$/.test(phone) && phone.length>0){
            setPhoneError('phone should be entirely numeric')
        } else {
            setPhoneError("")
        }
        if(password.length===0){
            setPasswordError('password is required')
        }else if(password.length<8){
            setPasswordError('password should have length atleast 8')
        } else {
            setPasswordError("")
        }
        if(confirmPassword.length===0){
            setConfirmPasswordError('enter password confirmation')
        }else if(confirmPassword!==password){
            setConfirmPasswordError('password and confirmation are not same')
        } else {
            setConfirmPasswordError("")
        }
    }

    const signupHandler = async()=>{
        if(!hasError){
            const signupData:Signup = {
                firstName,
                lastName,
                username:username,
                password:password,
                phone:phone,
                email:email
            }
            const res = await signup(signupData)
            if(!isError){
                setHasFormError(false)
                Cookies.set("user",JSON.stringify(res))
                if("data" in res){
                    navigate("/verify")
                }
            }else if(isError){
                setHasFormError(true)
                if("data" in error!){
                    if(error.status === null){
                        setFormError("make sure you are connected to the internet")
                    }else if(error.status === 415){
                        setFormError("error while registering")
                    }else{
                        //@ts-ignore
                        setFormError(error!.data?(error!.data.detail?error.data.detail:error.data):"failed to signup")
                    }
                    
                }else if("message" in error!){
                    setFormError(error!.message?error!.message:"failed to signup")
            }
        }
        }
    }

    useEffect(()=>{
        validator()
    },[username,email,firstName,lastName,phone,password,confirmPassword,validator])

    useEffect(()=>{
        if(firstNameError||lastNameError||emailError||usernameError||phoneError||passwordError||confirmPasswordError){
            setHasError(true)
            setBtnClr('bg-gray-500')
        }else{
            setHasError(false)
            setBtnClr('bg-primary')
        }
    },[firstNameError,lastNameError,emailError,usernameError,phoneError,passwordError,confirmPasswordError])

    return ( ( <main className="bg-secondary pt-36 flex flex-col h-min items-center">
        <div className="rounded-lg bg-slate-50 w-min px-20 pt-20 pb-10 flex flex-col items-start text-left mb-10">
            
            <img src="signup-icon.png" alt="person using phone with login mobile icon" className="h-32 md:h-36 self-center" />

            <label htmlFor="first_name" className="font-light mt-5 mb-2 ms-2">first name<span className="text-red-500 font-bold"> *</span></label>
            {firstNameError && <p className="font-light text-red-800">{firstNameError}</p>}
            <input type="text" id="first_name" className="border border-gray-600/40 rounded-lg h-10 w-64 md:w-80 p-3" placeholder="enter first name" value={firstName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setFirstName(e.target.value)}}/>

            <label htmlFor="last_name" className="font-light mt-5 mb-2 ms-2">last name<span className="text-red-500 font-bold"> *</span></label>
            {lastNameError && <p className="font-light text-red-800">{lastNameError}</p>}
            <input type="text" id="last_name" className="border border-gray-600/40 rounded-lg h-10 w-64 md:w-80 p-3" placeholder="enter last name" value={lastName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setLastName(e.target.value)}}/>

            <label htmlFor="username" className="font-light mt-5 mb-2 ms-2">username<span className="text-red-500 font-bold"> *</span></label>
            {usernameError && <p className="font-light text-red-800">{usernameError}</p>}
            <input type="text" id="username" className="border border-gray-600/40 rounded-lg h-10 w-64 md:w-80 p-3" placeholder="enter username" value={username} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setUsername(e.target.value)}}/>
            
            <label htmlFor="phone" className="font-light mt-5 mb-2 ms-2">phone</label>
            {phoneError && <p className="font-light text-red-800">{phoneError}</p>}
            <input type="text" id="phone" className="border border-gray-600/40 rounded-lg h-10 w-64 md:w-80 p-3" placeholder="enter phone" value={phone} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setPhone(e.target.value)}}/>

            <label htmlFor="email" className="font-light mt-5 mb-2 ms-2">email<span className="text-red-500 font-bold"> *</span></label>
            {emailError && <p className="font-light text-red-800">{emailError}</p>}
            <input type="text" id="email" className="border border-gray-600/40 rounded-lg h-10 w-64 md:w-80 p-3" placeholder="enter email" value={email} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}}/>

            <label htmlFor="password" className="font-light mt-5 mb-2 ms-2">password<span className="text-red-500 font-bold"> *</span></label>
            {passwordError && <p className="font-light text-red-800">{passwordError}</p>}
            <input type="password" id="password" className="border border-gray-600/40 rounded-lg h-10 w-64 md:w-80 p-3" placeholder="enter password" value={password} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}}/>

            
            <label htmlFor="confirm_password" className="font-light mt-5 mb-2 ms-2">confirm password<span className="text-red-500 font-bold"> *</span></label>
            {confirmPasswordError && <p className="font-light text-red-800">{confirmPasswordError}</p>}
            <input type="password" id="confirm_password" className="border border-gray-600/40 rounded-lg h-10 w-64 md:w-80 p-3" placeholder="enter confirmation password" value={confirmPassword} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setConfirmPassword(e.target.value)}}/>


            {hasFormError && <p className="font-light text-red-800 mt-8 ">{formError}</p>}
            <button className={`h-10 w-64 md:w-80 rounded-lg text-gray-50 mt-4 ${btnclr}`} onClick={signupHandler} disabled={hasError}>Signup</button>

            <p className="mt-8">Already have an account <span className="text-blue-600"><Link to="/login">sign in</Link></span></p>
        </div>
    </main> ) );
}
 
export default SignUpPage;