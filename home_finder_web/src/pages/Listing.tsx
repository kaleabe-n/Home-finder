import React, { useEffect, useState } from "react";
import Property from "../types/Property";
import { useGetPropertiesMutation } from "../store/features/properties.ts";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SingleProperty from "../components/SingleProperty.tsx";

const ListingPage = () => {
    const perPage = 8
    const [total,setTotal] = useState<number>(0)
    const [curr_list,setList] = useState<Property[]>([])
    const [token,setToken] = useState<string>("")
    const [page,setPage] = useState<number>(1)
    const [getProperties,{isLoading,isError,isSuccess,data,error}] = useGetPropertiesMutation()
    const navigate = useNavigate()
    const loadMoreHandler = async ()=>{
        const res = await getProperties({token,page,perPage})
        if('data' in res){
            if(res.data !== undefined){
                setList(curr_list.concat(res.data!.data))
                setPage(page+1)
            }
            if('total' in res.data){
                setTotal(res.data.total)
            }
        }
    }
    useEffect(()=>{
        const func = async()=>{
            const cookieData = Cookies.get('user')
            if(cookieData===undefined || cookieData==null){
                navigate('/login')
            }
            const {access} = JSON.parse(cookieData!).data
            setToken(access)
            const res = await getProperties({token:access,page,perPage})
            if('data' in res){
                if(res.data !== undefined){
                    setList(res.data.data)
                    setPage(page+1)
                }
                if('total' in res.data){
                    setTotal(res.data.total)
                }
            }
        }
        func()
    },[])
    return ( <div className="pt-32 w-full bg-secondary flex flex-col items-center">
        {curr_list!==undefined && curr_list!.map((property:Property)=>(<SingleProperty property={property} key={property.id}/>))}
        {curr_list.length<total && <button className="bg-primary text-white h-12 w-44 rounded my-4" onClick={loadMoreHandler}>load more</button>}
    </div> );
}
 
export default ListingPage;