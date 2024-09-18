import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglePropertyQuery } from "../store/features/properties.ts";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Property from "../types/Property.ts";
import base_uri from "../store/base_uri.ts";
import  Carousel  from "../components/Carousel.tsx"

const PropertyPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const selector = useSelector((state:any)=>state.token)
    const token = selector.value
    const {isSuccess,isError,data,isLoading} = useGetSinglePropertyQuery({id:id,token:token})
    
    if(isSuccess){
        var page =  (<div className="pt-32 w-full">
            <div className="flex flex-col items-start w-auto mx-8 md:mx-24 font-light">
                <h1 className="text-primary text-4xl font-semibold m-12">{data?.type.name}</h1>
                <Carousel paths={data.photos}/>
                <div className="ml-6 md:ml-12 md:mx-32 my-4 md:my-14">
                    <div className="my-8">
                        <h2 className="font-semibold">Description</h2>
                        <p className="text-light">{data.description}</p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-start gap-12 md:gap-48 items-start">
                        <div>
                            <h2 className="font-semibold">Details</h2>
                            <p>price: {data.price}</p>
                            <p>bedrooms: {data.bed_rooms}</p>
                            <p>bathrooms: {data.bath_rooms}</p>
                            <p>house area: {data.house_area}m<sup>2</sup></p>
                            <p>land area: {data.land_area}m<sup>2</sup></p>
                            <p>floors: {data.floors}</p>
                            <p>{data.is_furnished?"furnished":"not furnished"}</p>
                            <p>parking: {data.parking}cars</p>
                        </div>
                        <div className="">
                            <h2 className="font-semibold">Address</h2>
                            <p>city: <span>{data.address.city}</span></p>
                            <p>region: <span>{data.address.region}</span></p>
                            <p>zone: <span>{data.address.zone}</span></p>
                            <p>specific location: <span>{data.address.specific_location}</span></p>
                        </div>
                    </div>
                    <div className="my-12">
                        <h2 className="font-semibold">Contact</h2>
                        <p>Name: <span>{data.posted_by.first_name} {data.posted_by.last_name}</span></p>
                        <p>Username: <span>{data.posted_by.username}</span></p>
                        <p>Email: <span>{data.posted_by.email}</span></p>
                        <p>Phone: <span>{data.posted_by.phone}</span></p>
                    </div>
                    

                </div>
            </div>
            

        
        </div> );
    }else if(isLoading){
        var page = (<div className="h-screen pt-32">
            loading ...
        </div>)
    }else{
        var page = (<div>
            failed to load data
        </div>)
    }

    return page
}
 
export default PropertyPage;