interface Signup{
    firstName:string|null,
    lastName:string|null,
    password:string,
    email:string,
    phone:string|null,
    username:string
}

interface Verification{
    code:string,
    token:string
}
export default Signup
export {Verification}