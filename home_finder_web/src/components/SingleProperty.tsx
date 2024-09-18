import React from "react";
import Property from "../types/Property.ts";
import {FaBed, FaBuilding, FaChartArea, FaShower} from 'react-icons/fa6'
import { Link } from "react-router-dom";

const SingleProperty = ({property}:{property:Property}) => {
    return ( <Link to={`/property/${property.id}`} className="bg-slate-50 p-4 m-2 rounded-lg flex sm:flex-row flex-col justify-between w-11/12">
        <div >
            <h2 className="text-2xl font-semibold text-primary">{property.type.name}</h2>
            <p className="font-light ">{property.address.region},{property.address.zone}</p>
            <div className="flex pt-8">
                <div className="mx-2 flex justify-start">
                    <FaBed/> <p>{property.bed_rooms && property.bed_rooms}</p>
                </div>
                <div className="mx-2 flex justify-start">
                    <FaShower/><p>{property.bath_rooms && property.bath_rooms}</p>
                </div>
                <div className="mx-2 flex justify-start">
                    <FaChartArea/><p className="mx-2">{property.land_area && property.land_area}m <sup>2</sup></p>
                </div>
                <div className="mx-2 flex justify-start">
                    <FaBuilding/><p className="mx-2">{property.floors && property.floors}floors</p>
                </div>
            </div>
        </div>
        <div className="bg-primary h-max p-2 w-max rounded">
            <p className="font-semibole text-secondary">{property.price}</p>
        </div>
    </Link> );
}
 
export default SingleProperty;