import React, { useState } from "react";
import base_uri from "../store/base_uri.ts";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Carousel = ({paths}:{paths:string[]}) => {
    const [index,setIndex] = useState<number>(0)
    const moveLeft = ()=>{
        const newInd = index - 1
        if(newInd<0){
            setIndex(paths.length-1)
        }else{
            setIndex(newInd)
        }
    }
    const moveRight =()=>{
        const newInd = index + 1
        if(newInd>=paths.length){
            setIndex(0)
        }else{
            setIndex(newInd)
        }
    }
    setInterval(() => {
        const newInd = index + 1
        if(newInd>=paths.length){
            setIndex(0)
        }else{
            setIndex(newInd)
        }
    }, 3000)
    return ( <div className="flex items-center justify-center w-full md:gap-12">
        <button onClick={moveLeft} className="h-14 w-14 rounded-full bg-secondary flex justify-center items-center"><MdOutlineKeyboardArrowLeft className="h-12 w-12"/></button>
        <div style={{backgroundImage:`url(${base_uri + paths[index]})`}} className="w-10/12 md:w-10/12 h-64 md:h-screen bg-cover bg-center"></div>
        <button onClick={moveRight} className="h-14 w-14 rounded-full bg-secondary flex justify-center items-center"><MdOutlineKeyboardArrowRight className="h-12 w-12"/></button>
    </div> );
}
 
export default Carousel;