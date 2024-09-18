import Address from "./Address";
import PropertyType from "./PropertyType";
import User from "./User";

interface Property{
    id:string
    address:Address,
    price:number,
    bed_rooms:number,
    bath_rooms:number,
    house_area:number,
    land_area:number,
    floors:number,
    parking:number,
    is_furnished:boolean,
    posted_by:User,
    updated:Date,
    type:PropertyType,
    is_sold:boolean,
    photos:string[],
    description:string
}

export default Property