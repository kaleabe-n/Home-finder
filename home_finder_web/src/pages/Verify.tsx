import { useEffect, useState } from "react";
import React from "react";
import Cookies from "js-cookie";
import User from "../types/User";
import { useVerifyMutation } from "../store/features/auth.ts";
import { useNavigate } from "react-router-dom";

const VerificationPage = () => {
    const [verification,setVerification] = useState<string>("")
    const [verify,{isError,isLoading,data,error,isSuccess}] = useVerifyMutation()
    const navigate = useNavigate()
    const [hasError,setHasError] = useState<boolean>(true)
    const verifyHandler = async ()=>{
        const cookie = await JSON.parse(Cookies.get('user')!)

        const res = await verify({token:cookie.data.access,code:verification})
        if("data" in res){
            navigate('/')
        }

    }

    useEffect(()=>{
        if(verification.length>0){
            setHasError(false)
        }else{
            setHasError(true)
        }
    },[verification])
    return ( <div className="relative pt-44 mb-20 h-96 flex flex-col items-center -z-30">
        <h1 className="font-semibold text-4xl mb-3 text-primary">Verify your account</h1>
        <p className="font-light mb-4">enter the code sent to your email account</p>
        {hasError && <p className="text-start text-red-700 font-light">code cannot be empty</p>}
        <input type="text" className="rounded border h-10 w-80 border-secondary p-2" value={verification} onChange={(e)=>{setVerification(e.target.value)}}/>
        <button className="rounded border h-12 w-80 bg-primary text-white font-semibold mt-2" onClick={(e)=>{verifyHandler()}} disabled={hasError || isLoading}>verify</button>
    </div> );
}
 
export default VerificationPage;